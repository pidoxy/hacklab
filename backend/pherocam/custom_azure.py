from storages.backends.azure_storage import AzureStorage

class AzureMediaStorage(AzureStorage):
    account_name = 'hacklabphantoms' # Must be replaced by your <storage_account_name>
    account_key = 'cOYDn0nxzuzIpg8XRJ0z5WZxZvLuftmO/2B50oJZ2KZd/kyS0QKQd7SQEEueogYfnI/ceat3abWi+AStoIl6MA==' # Must be replaced by your <storage_account_key>
    azure_container = 'media'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = 'hacklabphantoms' # Must be replaced by your storage_account_name
    account_key = 'cOYDn0nxzuzIpg8XRJ0z5WZxZvLuftmO/2B50oJZ2KZd/kyS0QKQd7SQEEueogYfnI/ceat3abWi+AStoIl6MA==' # Must be replaced by your <storage_account_key>
    azure_container = 'static'
    expiration_secs = None