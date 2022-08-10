CREATE PROCEDURE sissalss_bd.sp_permissions_menu(
	in p_rol varchar(150))
BEGIN
	select *
	from permissions_menu pm 
	inner join users u 
	on pm.id_users = u.id 
	inner join menu_item mi 
	on pm.id_menu_item = mi.id 
	inner join menu_section ms 
	on mi.id_menu_section = ms.id 
	where u.username = p_rol;
END


-- PRUEBA 1
select ms.name, count(*)
from permissions_menu pm 
left join menu_item mi 
on pm.id_menu_item  = mi.id
left join menu_section ms
on ms.id = mi.id_menu_section 
left join users u 
on pm.id_users = u.id 
where u.username = 'ADMIN'
group by ms.name 
-- PERSONAL	1
-- CITAS	2

-- PRUEBA 2 (MENU_SECTION)
select ms.phrase
from permissions_menu pm 
inner join users u 
on pm.id_users = u.id 
inner join menu_item mi 
on pm.id_menu_item = mi.id 
inner join menu_section ms 
on mi.id_menu_section = ms.id 
where u.username ='ADMIN'
group by ms.phrase
-- CONTROL DEL PERSONAL
-- CONTROL DE CITAS

-- PRUEBA 3 (MENU_ITEM)
select ms.phrase
from permissions_menu pm 
inner join users u 
on pm.id_users = u.id 
inner join menu_item mi 
on pm.id_menu_item = mi.id 
inner join menu_section ms 
on mi.id_menu_section = ms.id 
where u.username ='ADMIN'
group by ms.phrase
-- CONTROL DEL PERSONAL
-- CONTROL DE CITAS

