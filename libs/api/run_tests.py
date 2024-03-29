import os
import subprocess
import concurrent.futures

def run_pytest(root_directory):
    test_files = []
    for root, dirs, files in os.walk(root_directory):
        for file in files:
            if file.startswith("tests_") and file.endswith(".py"):
                test_file = os.path.join(root, file)
                test_files.append(test_file)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = []
        for test_file in test_files:
            print(f"Running pytest for: {test_file}")
            results.append(
                executor.submit(
                    subprocess.run, ["pytest", "--cov=.", "--cov-report=xml", test_file]
                )
            )
        concurrent.futures.wait(results)


if __name__ == "__main__":
    root_directory = os.path.abspath(os.path.dirname(__file__))
    run_pytest(root_directory)
