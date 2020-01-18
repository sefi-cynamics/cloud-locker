import json
import boto3

def lambda_handler(event, context):
    ec2_client = boto3.client('ec2', access_key='', secret_key='', region_name='us-east-1')
    regions = [region["RegionName"] for region in ec2_client.describe_regions()["Regions"]]
    
    result = []
    
    region="us-east-1"
    #for region in regions:
    ec2_client = boto3.client('ec2', region_name=region)
    security_groups = ec2_client.describe_security_groups()["SecurityGroups"]
    for sg in security_groups:
        print(sg)
        is_open_for_ip = False
        for ip_perm in sg["IpPermissions"]#.get("IpPermissions", []):
            for ip_range in ip_perm["IpRanges"]#.get("IpRanges", []):
                for cidr in ip_range["CidrIp"]#.get("CidrIp", []):
                    if cidr == "0.0.0.0/0":
                        is_open_for_ip = True
                        break
                    
        result.append({"description": sg["Description"], "id": sg["GroupId"], "openForIp": is_open_for_ip})

    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

