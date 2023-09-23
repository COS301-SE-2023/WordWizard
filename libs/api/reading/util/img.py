import os
from dotenv import load_dotenv
load_dotenv()
import openai
openai.api_key = os.getenv("OPEN_AI_KEY")

def generate_image(prmpt: str):
    # response = openai.Image.create(
    #     prompt=prmpt,
    #     n=1,
    #     size="256x256"
    # )
    # image_url = response['data'][0]['url']
    # return image_url
    return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-JGmOTUcM2M3wCABseAUcn28k/user-TmMJnlGzWJMLYh3a8COqrgGn/img-Es9Ja74e9pM27LH7C1orRKsa.png?st=2023-08-29T04%3A52%3A52Z&se=2023-08-29T06%3A52%3A52Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-28T17%3A07%3A24Z&ske=2023-08-29T17%3A07%3A24Z&sks=b&skv=2021-08-06&sig=E1qbLDR9qWLCin3t2iv8AZCmsnvXQIUKYDgd5nRr6QQ%3D"
    # return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-JGmOTUcM2M3wCABseAUcn28k/user-TmMJnlGzWJMLYh3a8COqrgGn/img-f9jsGM4EBlttJSFoVO8Dj9Jq.png?st=2023-08-29T05%3A11%3A45Z&se=2023-08-29T07%3A11%3A45Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-28T11%3A41%3A47Z&ske=2023-08-29T11%3A41%3A47Z&sks=b&skv=2021-08-06&sig=N%2B7L1qOIIZ%2BOTxwMfFTz77X65tDLNwIvoNYlSoIHE3A%3D" 