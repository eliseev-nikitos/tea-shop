CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    login VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role_id INTEGER REFERENCES role(id)
);

CREATE TABLE tea (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    path_img VARCHAR(255),
    info TEXT
);

ALTER SEQUENCE tea_id_seq RESTART WITH 0;



INSERT INTO role (name) VALUES ('Пользователь');
INSERT INTO role (name) VALUES ('Администратор');


ALTER TABLE tea
ADD COLUMN price integer;

UPDATE tea
SET price = floor(random() * 89 + 10) * 10;

--

CREATE OR REPLACE FUNCTION set_random_price()
RETURNS TRIGGER AS $$
BEGIN
    NEW.price := floor(random() * 89 + 10) * 10;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_tea_price
BEFORE INSERT ON tea
FOR EACH ROW
EXECUTE FUNCTION set_random_price();