# S3-Files-Upload
This Repo contains steps to upload the file to s3 via backend from frontend
![1](https://github.com/user-attachments/assets/0a283b1a-d604-4d24-9d5f-b926a549b7ae)
# Create IAM role for ec2 to access s3
Go to IAM,click roles and click create a new role <br>
Select Entity type ( Here select aws service ),Attach policy ( s3 full access or specific operations of s3 ) and create a role <br>
![2](https://github.com/user-attachments/assets/52e50a1b-9dc0-45b0-9cc5-f1f85e947db5)
# Create an ec2 instance,attach that iam role to the source service ( ec2 )
Install softwares,pull the code,Install packages and save the process,Make sure to enable cors in the node.js to allow requests from outside
# Specify the port numbers in the security group ( Act as firewall for instance)
![Screenshot (489)](https://github.com/user-attachments/assets/cf32aa42-15d9-4554-ad48-6c94bac51741)
# Create an s3 bucket,enable static hosting and create a bucket policy to allow users to access the react.js website
![Screenshot (490)](https://github.com/user-attachments/assets/a6aec494-aa33-4846-b5b8-1f3e3e9ea463)
# Output
![Screenshot (491)](https://github.com/user-attachments/assets/021c830c-9e7b-4202-b48a-5696589404a6)
<br> When communicating from local access keys are required , if deployed inside aws iam role is preferred becuase of more secure
