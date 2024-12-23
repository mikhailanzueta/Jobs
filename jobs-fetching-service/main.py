from bs4 import BeautifulSoup
import yaml
import glob
import os
import requests
from pprint import pp
#print('Hello world')
class ParsedData:
    pass

# Ticket #1 - return yaml configs from file as a python dictionary

def read_yaml_from_file(file_name: str) -> dict:
    with open(file_name, 'r') as read_file:
        configs = yaml.safe_load(read_file)
    return configs
file_name = 'siteConfigs/Indeed.yaml'
contents = read_yaml_from_file(file_name)
print(contents)

# Ticket #3 - return html from fetched site as a data structure
def fetch_html_from_site(url: str, endpoint: str, query: str) -> BeautifulSoup:
    full_url = f"{url}{endpoint}{query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache"

    }
    response = requests.get(full_url, headers=headers)

    # If response is okay
    if response.status_code == 200:
        # Parse the HTML
        soup = BeautifulSoup(response.text, "html.parser")
        return soup
    else:
        pp(response.text)
        raise Exception(f"HTML could not be fetched. Status Code: {response.status_code}")

url = contents["site_name"]
endpoint = contents["path"]
query = contents["query_param"]
full_html = fetch_html_from_site(url, endpoint, query)


# Ticket #4 - return the parsed data from the html
def parse_data_from_html(hmtl, configs: dict) -> ParsedData:
    pass

# Ticket #5 - load the data into the DB
def load_data_into_db(data: ParsedData)-> None:
    pass

def read_all_yaml_files(folder_path):
    # Check if siteConfigs is a directory
    if not os.path.isdir(folder_path):
        print(f"Error: {folder_path} is not a valid directory")
        return
    else:
        print(f"{folder_path} is a valid directory")
    
    # Search inside of the folder_path and look for files ending in .yaml
    yaml_files = glob.glob(os.path.join(folder_path, "*.yaml"))
    # Where file configs will be stored
    all_configs = []
    for yaml_file in yaml_files:
        try:
            # Call function 1 on every yaml file
            config = read_yaml_from_file(yaml_file)
            # Add yaml file configs along with the file names to all_configs
            all_configs.append({os.path.basename(yaml_file): config})
        except:
            pp(f"Error reading {yaml_file}")
    return all_configs
    

folder_path = "siteConfigs"
all_configs = read_all_yaml_files(folder_path) 
pp(all_configs)
   