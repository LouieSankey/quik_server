CREATE TABLE pin_table (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    location_date_id TEXT NOT NULL,
    pin_date TEXT NOT NULL,
    location_id TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    seeking TEXT NOT NULL,
    user_name TEXT NOT NULL,
    age TEXT NOT NULL,
    bio TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    date_published TIMESTAMPTZ DEFAULT now() NOT NULL
);


