import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3ClientService {
	private readonly client: S3Client;
	private readonly bucketName: string;
	private readonly publicUrl: string;
	private readonly urlExpirationSeconds: number;

	constructor(configService: ConfigService) {
		this.client = new S3Client({
			region: configService.getOrThrow<string>("AWS_REGION"),
			endpoint: configService.getOrThrow<string>("AWS_ENDPOINT"),
			apiVersion: "latest",
			credentials: {
				accessKeyId: configService.getOrThrow<string>("AWS_ACCESS_KEY_ID"),
				secretAccessKey: configService.getOrThrow<string>("AWS_SECRET_ACCESS_KEY"),
			},
		});

		this.bucketName = configService.getOrThrow<string>("AWS_BUCKET_NAME");
		this.publicUrl = configService.getOrThrow<string>("AWS_PUBLIC_URL");
		this.urlExpirationSeconds = configService.getOrThrow<number>("AWS_SIGNED_URL_EXPIRATION_SECONDS");
	}

	async createSignedUrl(key: string): Promise<string> {
		return getSignedUrl(this.client, new PutObjectCommand({ Bucket: this.bucketName, Key: key }), {
			expiresIn: this.urlExpirationSeconds,
		});
	}

	getPublicUrl(key: string): string {
		return `${this.publicUrl}/${key}`;
	}
}
