<?php
require_once '../vendor/autoload.php';

use Aws\S3\S3Client;
use Aws\Exception\AwsException;

echo "<h2>Simple S3 Connection Test</h2>";

try {
    // Create S3 client using IAM role
    $s3Client = new S3Client([
        'version' => 'latest',
        'region'  => 'us-east-2', // Change to your region
    ]);

    echo "✅ S3 Client created successfully<br>";
    
    // List buckets
    $result = $s3Client->listBuckets();
    echo "<h3>Available Buckets:</h3>";
    foreach ($result['Buckets'] as $bucket) {
        echo "- " . $bucket['Name'] . "<br>";
    }

    // Test specific bucket (change this to your bucket name)
    $bucketName = 'your-drupal-files-bucket';
    
    echo "<h3>Testing bucket: $bucketName</h3>";
    
    // Check if bucket exists
    if ($s3Client->doesBucketExist($bucketName)) {
        echo "✅ Bucket exists<br>";
        
        // Test upload
        $s3Client->putObject([
            'Bucket' => $bucketName,
            'Key'    => 'test-drupal.txt',
            'Body'   => 'Hello from Drupal S3FS test!',
        ]);
        echo "✅ Upload test successful<br>";
        
        // Test list objects
        $objects = $s3Client->listObjects(['Bucket' => $bucketName, 'MaxKeys' => 5]);
        echo "✅ List objects successful<br>";
        
        // Clean up test file
        $s3Client->deleteObject([
            'Bucket' => $bucketName,
            'Key'    => 'test-drupal.txt',
        ]);
        echo "✅ Delete test successful<br>";
        
    } else {
        echo "❌ Bucket '$bucketName' does not exist<br>";
        echo "💡 Create it with: aws s3 mb s3://$bucketName --region us-east-2<br>";
    }

} catch (AwsException $e) {
    echo "❌ AWS Error: " . $e->getMessage() . "<br>";
    echo "Error Code: " . $e->getAwsErrorCode() . "<br>";
} catch (Exception $e) {
    echo "❌ General Error: " . $e->getMessage() . "<br>";
}
