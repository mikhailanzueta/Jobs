from bs4 import BeautifulSoup

class ParsedData:
    pass

# Ticket #1 - return yaml configs from file as a python dictionary
def read_yaml_from_file(file_name: str) -> dict:
    pass

# Ticket #3 - return html from fetched site as a data structure
def fetch_html_from_site(url: str, endpoint: str, query: str) -> BeautifulSoup:
    pass

# Ticket #4 - return the parsed data from the html
def parse_data_from_html(hmtl, configs: dict) -> ParsedData:
    pass

# Ticket #5 - load the data into the DB
def load_data_into_db(data: ParsedData)-> None:
    pass
