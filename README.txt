Sign up send verification email error:
Problem: Resend (tech used to send emails) requires a unique domain to be able to send emails to 
        A lot of different emails
Solution: Get a private domain and register it with Resend
        Then change Line 47 of "get-payload.ts" and change the fromEmail line to the private email

7:23:00- May have an issue with the image slider