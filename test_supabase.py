#!/usr/bin/env python3

import os
from supabase import create_client

# Set your credentials
supabase_url = "https://nonsuesczcfwkpzoccyj.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbnN1ZXNjemNmd2twem9jY3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NjY1MzgsImV4cCI6MjA3MTI0MjUzOH0.b4wjPi6T9NyGfoqke2n3ENbdiwLNVoPyU5PtOaXkPqA"

print("Testing Supabase connection...")
print(f"URL: {supabase_url}")
print(f"Key: {supabase_key[:20]}...")

try:
    # Create client
    supabase = create_client(supabase_url, supabase_key)
    print("✅ Client created successfully")
    
    # Test storage access
    print("\nTesting storage access...")
    
    # Try to list buckets
    try:
        response = supabase.storage.list_buckets()
        print(f"✅ Buckets response: {response}")
        
        if isinstance(response, list):
            bucket_names = [bucket['name'] if isinstance(bucket, dict) else str(bucket) for bucket in response]
            print(f"Found bucket names: {bucket_names}")
        else:
            print(f"Unexpected response type: {type(response)}")
            
    except Exception as e:
        print(f"❌ Error listing buckets: {e}")
        print(f"Error type: {type(e)}")
        import traceback
        traceback.print_exc()
    
    # Test a specific bucket
    print("\nTesting specific bucket access...")
    try:
        bucket_response = supabase.storage.from_('carousel-images').list()
        print(f"✅ carousel-images bucket accessible: {bucket_response}")
    except Exception as e:
        print(f"❌ Error accessing carousel-images bucket: {e}")
        
except Exception as e:
    print(f"❌ Failed to create client: {e}")
    import traceback
    traceback.print_exc()
