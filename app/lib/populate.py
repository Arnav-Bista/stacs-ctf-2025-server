import sqlite3
import csv
import sys
from pathlib import Path


def import_challenges(csv_file_path):
    """Import challenges from CSV file into the database."""
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        # Begin transaction
        cursor.execute('BEGIN TRANSACTION')

        # Clear existing flags (optional - comment out if you want to preserve existing data)
        cursor.execute('DELETE FROM flags')

        # Read CSV file
        with open(csv_file_path, 'r', encoding='utf-8') as f:
            csv_reader = csv.DictReader(f)

            # Process each row
            for row in csv_reader:
                # Skip rows without flags or if flag is 'TODO'
                if not row['Flag'] or row['Flag'] == 'TODO':
                    print(f"Skipping challenge #{row['#']}: No flag or TODO")
                    continue

                # Convert points to integer, default to 0 if not specified or invalid
                try:
                    points = int(row['Points']) if row['Points'] else 0
                except ValueError:
                    points = 0
                    print(f"Warning: Invalid points value for challenge #{
                          row['#']}, defaulting to 0")

                # Insert the flag
                try:
                    cursor.execute(
                        'INSERT INTO flags (id, flag, points) VALUES (?, ?, ?)',
                        (int(row['#']), row['Flag'], points)
                    )
                    print(f"Inserted challenge #{row['#']}: {points} points")
                except sqlite3.Error as e:
                    print(f"Error inserting challenge #{row['#']}: {str(e)}")

        # Commit transaction
        conn.commit()
        print("Database import completed successfully")

    except Exception as e:
        # Rollback on error
        conn.rollback()
        print(f"Error during import: {str(e)}")
        raise
    finally:
        conn.close()


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script.py <path_to_csv_file>")
        sys.exit(1)

    csv_file_path = sys.argv[1]
    if not Path(csv_file_path).is_file():
        print(f"Error: File '{csv_file_path}' does not exist")
        sys.exit(1)

    import_challenges(csv_file_path)
