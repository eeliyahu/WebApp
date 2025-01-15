import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

let users = [
  {
    id: 10001,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  },
  {
    id: 10002,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "securePassword456",
  },
  {
    id: 10003,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    password: "m1ch43lBr0wn",
  },
  {
    id: 10004,
    name: "Emily White",
    email: "emily.white@example.com",
    password: "eWhite!890",
  },
  {
    id: 10005,
    name: "Chris Green",
    email: "chris.green@example.com",
    password: "greenChris2024",
  },
  {
    id: 10006,
    name: "Sophia Johnson",
    email: "sophia.johnson@example.com",
    password: "s0ph1aJ2025",
  },
  {
    id: 10007,
    name: "Liam Davis",
    email: "liam.davis@example.com",
    password: "Liam.D_123",
  },
  {
    id: 10008,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    password: "OliviaMartz99",
  },
  {
    id: 10009,
    name: "Ethan Wilson",
    email: "ethan.wilson@example.com",
    password: "Ethan@Wilson",
  },
  {
    id: 10010,
    name: "Isabella Garcia",
    email: "isabella.garcia@example.com",
    password: "IsaGarcia!77",
  },
];

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService  {

  createDb() {
    return { users };
  }

}
