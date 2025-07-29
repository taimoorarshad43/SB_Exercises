-- write your queries here

-- Join the two tables so that every column and record appears, regardless of if there is not an owner_id
SELECT 
    o.id,
    o.first_name,
    o.last_name,
    v.id,
    v.make,
    v.model,
    v.year,
    v.price,
    v.owner_id
FROM owners o
LEFT JOIN vehicles v ON o.id = v.owner_id
ORDER BY o.id, v.id;

-- Count the number of cars for each owner
SELECT 
    o.first_name,
    o.last_name,
    COUNT(v.id) as count
FROM owners o
LEFT JOIN vehicles v ON o.id = v.owner_id
GROUP BY o.id, o.first_name, o.last_name
ORDER BY o.first_name ASC;

-- Count the number of cars for each owner and display the average price for each of the cars as integers
SELECT 
    o.first_name,
    o.last_name,
    ROUND(AVG(v.price)) as average_price,
    COUNT(v.id) as count
FROM owners o
LEFT JOIN vehicles v ON o.id = v.owner_id
GROUP BY o.id, o.first_name, o.last_name
HAVING COUNT(v.id) > 1 AND ROUND(AVG(v.price)) > 10000
ORDER BY o.first_name DESC;