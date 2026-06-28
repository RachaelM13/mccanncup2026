-- Fix team display names to match FIFA official names
UPDATE teams SET name = 'Cabo Verde' WHERE fifa_code = 'CPV';
UPDATE teams SET name = 'USA'        WHERE fifa_code = 'USA';
