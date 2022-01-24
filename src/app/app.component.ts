import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnInit,
	ViewChild,
} from '@angular/core';
import Quagga, { QuaggaJSConfigObject } from '@ericblade/quagga2';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild(BarcodeScannerLivestreamComponent)
	barcodeScanner: BarcodeScannerLivestreamComponent;
	constructor(private changeDetector: ChangeDetectorRef) {}

	title = 'isitlestle';
	started = false;
	barcodeValue: string;
	devices: MediaDeviceInfo[];
	selectedDeviceId: string;
	type: ['ean_reader', 'ean_8_reader'];
	config: Partial<QuaggaJSConfigObject> = {
		decoder: {
			readers: ['ean_reader', 'ean_8_reader', 'ean_5_reader'],
		},
		debug: true,
	};

	async ngAfterViewInit(): Promise<void> {
		this.barcodeScanner.config = this.config;
		this.barcodeScanner.start();
		this.started = true;
	}

	async changeCamera(deviceId: string): Promise<void> {
		console.log(`Changing camera to ${deviceId}`);
		this.config.inputStream = {
			constraints: {
				deviceId,
				facingMode: 'environment',
			},
		};

		await Quagga.CameraAccess.release();

		//this.barcodeScanner.deviceId = deviceId;

		// this.barcodeValue = 'Restarted';
		//this.selectedDeviceId = deviceId;

		// this.changeDetector.detectChanges();
		if (this.started) {
			await this.barcodeScanner.restart();
		} else {
			await this.barcodeScanner.start();
			this.started = true;
		}

		// this.barcodeScanner.restart();
	}

	restart(): void {
		this.barcodeScanner.restart();
	}

	onValueChanges(result: any): void {
		this.barcodeValue = result.codeResult.code;
		console.log({ result });
	}

	async onStarted(started: any): Promise<void> {
		this.devices = await Quagga.CameraAccess.enumerateVideoDevices();
		this.changeDetector.detectChanges();
	}
}
