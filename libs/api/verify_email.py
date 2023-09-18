import os
import random
import string
import smtplib
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
load_dotenv()

def send(recipient_email, verification_code):
    message = MIMEMultipart('alternative')
    message['Subject'] = 'Email Verification'
    message['From'] = os.getenv("ADMIN_EMAIL")
    message['To'] = recipient_email
    html = f'''
    <html>
      <body>
        <h2>Email Verification</h2>
        <p>Hello,</p>
        <p style='color:red'>Please use the following verification code: <strong>{verification_code}</strong></p>
        <p>Thank you!</p>
      </body>
    </html>
    '''
    message.attach(MIMEText(html, 'html'))
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(os.getenv("ADMIN_EMAIL"), os.getenv("ADMIN_PASS"))
        server.sendmail(os.getenv("ADMIN_EMAIL"),  recipient_email, message.as_string())
    except Exception as e:
        print('An error occurred while sending the email:', str(e))
    finally:
        server.quit()

def generate_verification_code(length=6):
    characters = string.digits
    verification_code = ''.join(random.choice(characters) for _ in range(length))
    return verification_code