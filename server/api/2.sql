-- CREATE temp TABLE tt_goods AS
SELECT
*
FROM
	api_invoiceoutlist;
	
SELECT
	@warehouse_id=1,
	tt_goods.goods_id,
	SUM(tt_goods.sum) AS summ,
	SUM(tt_goods.quantity) AS quantity
	
FROM 
	tt_goods
WHERE
	goods_id = :id_value
GROUP BY goods_id;


-- DROP TABLE tt_goods;