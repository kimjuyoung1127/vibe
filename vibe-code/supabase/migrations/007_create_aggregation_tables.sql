-- Create weekly_vibe_ranking materialized view
-- This view aggregates project vibe checks from the last 7 days
CREATE MATERIALIZED VIEW weekly_vibe_ranking AS
SELECT 
    p.id AS project_id,
    p.title,
    COUNT(vc.id) AS vibe_check_count_7_days,
    MAX(vc.created_at) AS last_updated
FROM projects p
JOIN vibe_checks vc ON vc.target_id = p.id AND vc.target_type = 'project'
WHERE vc.created_at >= NOW() - INTERVAL '7 days'
  AND p.is_public = true
GROUP BY p.id, p.title
ORDER BY vibe_check_count_7_days DESC, last_updated DESC;

-- Create indexes for better query performance
CREATE INDEX idx_weekly_vibe_ranking_project_id ON weekly_vibe_ranking(project_id);
CREATE INDEX idx_weekly_vibe_ranking_count ON weekly_vibe_ranking(vibe_check_count_7_days);

-- Create a function to refresh the weekly_vibe_ranking materialized view
CREATE OR REPLACE FUNCTION refresh_weekly_vibe_ranking()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY weekly_vibe_ranking;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to refresh the materialized view when vibe_checks are inserted or deleted
CREATE TRIGGER refresh_weekly_vibe_ranking_insert
    AFTER INSERT ON vibe_checks
    FOR EACH STATEMENT
    EXECUTE FUNCTION refresh_weekly_vibe_ranking();

CREATE TRIGGER refresh_weekly_vibe_ranking_delete
    AFTER DELETE ON vibe_checks
    FOR EACH STATEMENT
    EXECUTE FUNCTION refresh_weekly_vibe_ranking();

-- Create a function to update vibe_check_count and comment_count in related tables
CREATE OR REPLACE FUNCTION update_post_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle vibe_checks
    IF TG_TABLE_NAME = 'vibe_checks' THEN
        IF TG_OP = 'INSERT' THEN
            -- Increment the vibe_check_count in the related table
            CASE NEW.target_type
                WHEN 'project' THEN
                    UPDATE projects SET vibe_check_count = vibe_check_count + 1 WHERE id = NEW.target_id;
                WHEN 'review' THEN
                    UPDATE tool_reviews SET vibe_check_count = vibe_check_count + 1 WHERE id = NEW.target_id;
                WHEN 'community' THEN
                    UPDATE community_posts SET vibe_check_count = vibe_check_count + 1 WHERE id = NEW.target_id;
                WHEN 'news' THEN
                    UPDATE news_articles SET vibe_check_count = vibe_check_count + 1 WHERE id = NEW.target_id;
                WHEN 'comment' THEN
                    UPDATE comments SET vibe_check_count = vibe_check_count + 1 WHERE id = NEW.target_id;
            END CASE;
        ELSIF TG_OP = 'DELETE' THEN
            -- Decrement the vibe_check_count in the related table
            CASE OLD.target_type
                WHEN 'project' THEN
                    UPDATE projects SET vibe_check_count = vibe_check_count - 1 WHERE id = OLD.target_id;
                WHEN 'review' THEN
                    UPDATE tool_reviews SET vibe_check_count = vibe_check_count - 1 WHERE id = OLD.target_id;
                WHEN 'community' THEN
                    UPDATE community_posts SET vibe_check_count = vibe_check_count - 1 WHERE id = OLD.target_id;
                WHEN 'news' THEN
                    UPDATE news_articles SET vibe_check_count = vibe_check_count - 1 WHERE id = OLD.target_id;
                WHEN 'comment' THEN
                    UPDATE comments SET vibe_check_count = vibe_check_count - 1 WHERE id = OLD.target_id;
            END CASE;
        END IF;
    -- Handle comments
    ELSIF TG_TABLE_NAME = 'comments' THEN
        IF TG_OP = 'INSERT' THEN
            -- Increment the comment_count in the related table
            CASE NEW.post_type
                WHEN 'project' THEN
                    UPDATE projects SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
                WHEN 'review' THEN
                    UPDATE tool_reviews SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
                WHEN 'community' THEN
                    UPDATE community_posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
                WHEN 'news' THEN
                    UPDATE news_articles SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
            END CASE;
        ELSIF TG_OP = 'DELETE' THEN
            -- Decrement the comment_count in the related table
            CASE OLD.post_type
                WHEN 'project' THEN
                    UPDATE projects SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
                WHEN 'review' THEN
                    UPDATE tool_reviews SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
                WHEN 'community' THEN
                    UPDATE community_posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
                WHEN 'news' THEN
                    UPDATE news_articles SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
            END CASE;
        END IF;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update post stats when vibe_checks are inserted or deleted
CREATE TRIGGER update_post_stats_vibe_checks_insert
    AFTER INSERT ON vibe_checks
    FOR EACH ROW
    EXECUTE FUNCTION update_post_stats();

CREATE TRIGGER update_post_stats_vibe_checks_delete
    AFTER DELETE ON vibe_checks
    FOR EACH ROW
    EXECUTE FUNCTION update_post_stats();

-- Create triggers to update post stats when comments are inserted or deleted
CREATE TRIGGER update_post_stats_comments_insert
    AFTER INSERT ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_stats();

CREATE TRIGGER update_post_stats_comments_delete
    AFTER DELETE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_stats();