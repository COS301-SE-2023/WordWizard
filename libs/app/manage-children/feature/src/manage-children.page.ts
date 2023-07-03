import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'word-wizard-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage {
  children: { name: string, image: string }[] = [
    { name: "Alice", image: "https://cdn.gencraft.com/prod/user/68746a39-b615-4532-8ea7-f366a907522b/a4d847ec-4260-4ddb-a675-3c37745d7a57/images/image0_1024_1024_watermark.jpg?Expires=1688408836&Signature=n-7FLgg8EHDxb3xQ0RyZ77C8xCDjVYQZHKyKYeMTIryp6gSQEWB5SZWILvJLFXJ0TnaWDY535eC9tXAv4DMdv1XoxhOyLuLPLx1RTCx3I7qdlPqZxBYEU7bCdaCJCSzDUQ3TA7LwYS4asUn395dEopEVCSmDL8ex9nCXXRqZ7pxThzlSthp4~g9GvFdd~QuEDH67MwiUSBsMlHdwxCxXnLT-I4VquYRtkSLpc6LpGCD3~2gmUm7dCBPBTLlHT9~TLTEdsN4TclDP05K2Tlob-lYuFvE015ZXFUIiIlC0hnxFvpGQWevLkJaMejm2A3Gz4FNxno3GtAN4ftam-K2F7w__&Key-Pair-Id=K3RDDB1TZ8BHT8" },
    { name: "Sam", image: "https://cdn.gencraft.com/prod/user/68746a39-b615-4532-8ea7-f366a907522b/6ca4d543-f01a-4d98-8400-439f884444a1/images/image0_1024_1024_watermark.jpg?Expires=1688408902&Signature=bui7GPjIdamx9km6XrKi~4sTQwuSA5C-DKMFvaeQ1qPWv9ObReN9zQkyG9J1tg2ojr58vZb3xoElf4HyxJtXbc7e7vXBNWz2Va1GFILrfjy0qFCgBCjxnJIqaBfJs96GVoJlMI6~-AAY8oceiBWEy~mbHUFg7ZTREoa-dDPKrNjBODggTtPtmdE8Y~vxADA2cZgvCYFHj8dlJ4qMz5tJRtX9WVQ1rslyRJVOu5YwG~kaU4aerXosFFi~WwJVzWv8BExcAXW~ljPh7N~fsKDVZZVLzB8sGZLlJQ7PPhZQkYXqLkDZvMjXpJHkw2PmSVHIXQdFxc8bZ8WVYNK4HkHouw__&Key-Pair-Id=K3RDDB1TZ8BHT8" },
    { name: "Charlie", image: "https://cdn.gencraft.com/prod/user/68746a39-b615-4532-8ea7-f366a907522b/ad06c2ef-1c0f-48ae-9ade-c454359e5398/images/image0_1024_1024_watermark.jpg?Expires=1688408946&Signature=qNmJfvvuIe9dWxacstL0Sdk9C2huOMXAEE0YKUb5szdSNG8dcCFbLKPVhK8iqcvzgwOI~~RKJsNnglKxBQ22PuXU2ukLb-If2czmEzKgEAUpLyTsLuljw0jtKohyj6YQfs~PX3BuwQoYOdFVEsW29aQ~2VQRk3E~Qxasxo3Euyu6TI94c~rmYBdVgh6Fb26BfqC8t987nxPcYybckULYCzfMA0A0yXImmz~zAYYSZ99E0IcpfRc~661njEVG2rXlRECxAefsUbT6aatY6bQ-pYCnxTuoLwmkK38nvhHm15MLLaOmrQOvWX-jJymvb0TAKhtaGu44PxhYODgIBEuRtA__&Key-Pair-Id=K3RDDB1TZ8BHT8" }
  ];

  constructor(private router: Router) {}

  setChild(child: { name: string, image: string }) {
    console.log("Selected child:", child);
    this.router.navigate(['library']); //chanfe to child statistics page
    // Add your logic here to handle the selection of a child
  }

  addNewChild() {
    console.log("Adding new child");
    // Add your logic here to handle adding a new child
  }
}