from utils import *
import sys


if __name__ == "__main__":
    query = sys.argv[1];

    result = search_teas(query=query, threshold=80, table="tea");
    print(result)
