SELECT 
    SUM(CASE 
        WHEN type_movement == 'In' THEN 
              quantity
        ELSE 
            - quantity
    END ) AS ee,
    goods_id,
    batch_id,
	1 AS sort
FROM 
    api_movementgoods
 
 GROUP BY
 goods_id, 
 batch_id


UNION ALL

SELECT 
    SUM(CASE 
        WHEN type_movement == 'In' THEN 
              quantity
        ELSE 
            - quantity
    END ) AS ee,
    goods_id,
	NULL,
	0
FROM 
    api_movementgoods
 
 GROUP BY
	 goods_id
 ORDER BY goods_id, sort