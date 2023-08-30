import os


def generate_file_structure(api_name):
    base_dir = api_name
    api_dir = os.path.join(base_dir, "api")
    tests_dir = os.path.join(base_dir, "tests")
    util_dir = os.path.join(base_dir, "util")

    os.makedirs(api_dir, exist_ok=True)
    os.makedirs(tests_dir, exist_ok=True)
    os.makedirs(util_dir, exist_ok=True)

    with open(os.path.join(base_dir, "__init__.py"), "w") as f:
        pass

    with open(os.path.join(api_dir, "__init__.py"), "w") as f:
        pass

    with open(os.path.join(api_dir, f"{api_name}.py"), "w") as f:
        f.write("from fastapi import APIRouter\n\nrouter = APIRouter()")

    with open(os.path.join(tests_dir, "__init__.py"), "w") as f:
        pass

    with open(os.path.join(tests_dir, f"tests_{api_name}.py"), "w") as f:
        pass

    with open(os.path.join(util_dir, "__init__.py"), "w") as f:
        pass

    with open(os.path.join(util_dir, f"{api_name}_models.py"), "w") as f:
        pass


if __name__ == "__main__":
    api_name = input("Enter the name of the API: ")
    generate_file_structure(api_name)
