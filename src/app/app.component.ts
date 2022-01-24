import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild(BarcodeScannerLivestreamComponent)
	barcodeScanner: BarcodeScannerLivestreamComponent;

	title = 'isitlestle';
	barcodeValue = undefined;

	ngAfterViewInit(): void {
		console.log('Starting');
		this.barcodeScanner.start();
	}

	onValueChanges(result: any): void {
		this.barcodeValue = result.codeResult.code;
		console.log({ result });
	}

	onStarted(started: any): void {
		console.log(started);
	}
}
