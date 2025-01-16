-- File: req01.sql
DELETE FROM public.epix_posts
WHERE id = 836;

-- File: req02.sql
WITH amina_posts AS (
    SELECT downvotes::FLOAT / NULLIF(upvotes, 0) AS ratio
    FROM public.epix_posts
    WHERE author_id = (SELECT id FROM public.epix_accounts WHERE username = 'Amina Dubois') 
      AND id != 139
),
average_ratio AS (
    SELECT AVG(ratio) AS avg_ratio
    FROM amina_posts
)
UPDATE public.epix_posts
SET downvotes = ROUND(upvotes * (SELECT avg_ratio FROM average_ratio))
WHERE id = 139;

-- File: req03.sql
DELETE FROM public.epix_posts
USING public.epix_hashtags, public.epix_accounts
WHERE public.epix_posts.hashtag_id = public.epix_hashtags.id
  AND public.epix_posts.author_id = public.epix_accounts.id
  AND public.epix_hashtags.name = 'EndSurveillance'
RETURNING 
  public.epix_accounts.first_name, 
  public.epix_accounts.last_name, 
  public.epix_accounts.username, 
  public.epix_posts.body AS post_content;

-- File: req04.sql
UPDATE public.epix_hashtags
SET deleted_at = (SELECT created_at + (updated_at - created_at) FROM public.epix_hashtags WHERE name = 'EndSurveillance')
WHERE name = 'EndSurveillance';
