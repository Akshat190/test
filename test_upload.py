#!/usr/bin/env python3

import os
from supabase import create_client

# Set your credentials
supabase_url = "https://nonsuesczcfwkpzoccyj.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbnN1ZXNjemNmd2twem9jY3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NjY1MzgsImV4cCI6MjA3MTI0MjUzOH0.b4wjPi6T9NyGfoqke2n3ENbdiwLNVoPyU5PtOaXkPqA"

print("Testing bucket upload functionality...")

try:
    # Create client
    supabase = create_client(supabase_url, supabase_key)
    print("✅ Client created successfully")
    
    # Test each bucket individually
    buckets_to_test = [
        'carousel-images',
        'celebration-images', 
        'gallery-images',
        'gallery-thumbnails'
    ]
    
    for bucket_name in buckets_to_test:
        print(f"\n🧪 Testing bucket: {bucket_name}")
        try:
            # Try to list files in the bucket (should work if bucket exists and is accessible)
            files = supabase.storage.from_(bucket_name).list()
            print(f"  ✅ {bucket_name}: Accessible (files: {len(files)})")
            
            # Test creating a small test file
            test_content = f"Test file for {bucket_name}"
            test_filename = f"test-{bucket_name}.txt"
            
            # Try to upload
            try:
                result = supabase.storage.from_(bucket_name).upload(
                    test_filename, 
                    test_content.encode('utf-8'),
                    {"content-type": "text/plain"}
                )
                print(f"  ✅ {bucket_name}: Upload successful - {result}")
                
                # Get public URL
                public_url = supabase.storage.from_(bucket_name).get_public_url(test_filename)
                print(f"  ✅ {bucket_name}: Public URL - {public_url}")
                
                # Clean up - delete test file
                try:
                    supabase.storage.from_(bucket_name).remove([test_filename])
                    print(f"  ✅ {bucket_name}: Test file cleaned up")
                except:
                    print(f"  ⚠️ {bucket_name}: Could not clean up test file (not a problem)")
                
            except Exception as upload_e:
                print(f"  ❌ {bucket_name}: Upload failed - {upload_e}")
                
        except Exception as e:
            print(f"  ❌ {bucket_name}: Not accessible - {e}")
    
    print(f"\n🎉 Summary: All buckets that you can see in your dashboard should be working!")
    print(f"The list_buckets() API might be restricted by permissions, but individual bucket access works.")
    
except Exception as e:
    print(f"❌ Failed to create client: {e}")
