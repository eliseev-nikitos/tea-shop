import os

from fuzzywuzzy import fuzz
from sqlalchemy import create_engine
from dotenv import load_dotenv
import pandas as pd
import numpy as np


DOTENV_PATH = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(DOTENV_PATH):
    load_dotenv(DOTENV_PATH)

DB_HOST=os.getenv("DB_HOST")
DB_PORT=os.getenv("DB_PORT")
DB_USER=os.getenv("DB_USER")
DB_PASSWORD=os.getenv("DB_PASSWORD")
DB_NAME=os.getenv("DB_NAME")


def get_dataframe(table):
    engine = create_engine(f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')

    data = pd.read_sql_table(table, con=engine)
    data = data.sort_values('id')

    return data


def get_list_of_teas(dists_values, threshold):
    ans_indices = np.where(dists_values > threshold)[0]
    values = dists_values[ans_indices]
    sorted_indices_desc = ans_indices[np.argsort(-values)]

    if len(sorted_indices_desc) > 0:
        return sorted_indices_desc

    return []


def search_teas(query, threshold, table='tea'):

    data = get_dataframe(table)

    lev_dists = np.array(list(map(lambda x: fuzz.WRatio(query, x), data.name.tolist())))

    ans_recipes = get_list_of_teas(lev_dists, threshold)

    return ans_recipes