CREATE TABLE store (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE item (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating FLOAT,
    notes TEXT,
    store_id INT,
    FOREIGN KEY (store_id) REFERENCES store(id)
);