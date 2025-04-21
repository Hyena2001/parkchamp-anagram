import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  entries: string[] = [];
  resultCount = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = 'https://parkchampanagramchecker-default-rtdb.firebaseio.com/test.json';
    this.http.get<{ [key: string]: string | null }>(url)
      .subscribe(data => {
          this.entries = Object.values(data)
            .filter((v): v is string => v != null && typeof v === 'string');

          console.log('filter entries:', this.entries);
        },
        err => console.error('ERROR:', err));
  }

  onQuery(query: string) {
    const sorted = (s: string) => s.split('').sort().join('');
    this.resultCount = this.entries
      .filter(w => sorted(w) === sorted(query) && w !== query)
      .length;
  }
}
