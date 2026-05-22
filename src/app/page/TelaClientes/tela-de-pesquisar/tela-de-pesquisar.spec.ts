import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDePesquisar } from './tela-de-pesquisar';

describe('TelaDePesquisar', () => {
  let component: TelaDePesquisar;
  let fixture: ComponentFixture<TelaDePesquisar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaDePesquisar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaDePesquisar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
