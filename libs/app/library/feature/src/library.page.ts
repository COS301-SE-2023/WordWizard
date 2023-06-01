import { Component } from '@angular/core';
import { List } from './list.interface';
import { 
  SetVocab,
  SetPractice,
  LibraryState,
 } from '@word-wizard/app/library/data-access';
 import { Select, Store } from '@ngxs/store';
@Component({
  selector: 'library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss']
})
export class LibraryPage {

  hasVocab = true;
  hasPractice = true;

  dictionary:List[] = [
    {
      word:"Apple",
      definition:" usually round, red or yellow, edible fruit of a small tree", //definition of apple
    },
    {
      word:"Banana",
      definition:"a long curved fruit which grows in clusters and has soft pulpy flesh and yellow skin when ripe",  //definition of banana
    },
    {
      word:"Cat",
      definition:"a small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws",
    },
    {
      word:"Dog",
      definition:"a common animal with four legs, especially kept by people as a pet or to hunt or guard things",
    },
    {
      word:"Elephant",
      definition:"a very large plant-eating mammal with a prehensile trunk, long curved ivory tusks, and large ears, native to Africa and southern Asia. It is the largest living land anima",
    },
    {
      word:"Fish",
      definition:"a limbless cold-blooded vertebrate animal with gills and fins living wholly in water",
    },
    {
      word:"Giraffe",
      definition:"a large African mammal with a very long neck and forelegs, having a coat patterned with brown patches separated by lighter lines. It is the tallest living animal",
    },
    {
      word:"Horse",
      definition:"a large plant-eating domesticated mammal with solid hoofs and a flowing mane and tail, used for riding, racing, and to carry and pull loads",
    },
    {
      word:"Ice cream",
      definition:"a very cold sweet food made from frozen milk or cream, sugar, and a flavour",
    },
    {
      word:"Juice",
      definition:"the liquid obtained from or present in fruit or vegetables",
    },
    {
      word:"Kangaroo",
      definition:"a large plant-eating marsupial with a long powerful tail and strongly developed hindlimbs that enable it to travel by leaping, found only in Australia and New Guinea",
    },
    {
      word:"Lion",
      definition:"a large tawny-coloured cat that lives in prides, found in Africa and north-western India. The male has a flowing shaggy mane and takes little part in hunting, which is done cooperatively by the females",
    },
    {
      word:"Monkey",
      definition:"a small to medium-sized primate that typically has a long tail, most kinds of which live in trees in tropical countries",
    },
    {
      word:"Noodle",
      definition:"a food in the form of long, thin strips made from flour or rice, water, and often egg, cooked in boiling liquid",
    },
    {
      word:"Orange",
      definition:"a round juicy citrus fruit with a tough bright reddish-yellow rind",
    },
    {
      word:"Pig",
      definition:"an omnivorous domesticated hoofed mammal with sparse bristly hair and a flat snout for rooting in the soil, kept for its meat",
    },
    {
      word:"Queen",
      definition:"the female ruler of an independent state, especially one who inherits the position by right of birth",
    },
    {
      word:"Rabbit",
      definition:"a burrowing, gregarious, plant-eating mammal with long ears, long hind legs, and a short tail",
    },
    {
      word:"Strawberry",
      definition:"a sweet soft red fruit with a seed-studded surface",
    }
  ]

  practice:List[] = [
    {
      word:"Tiger",
      definition:"a very large solitary cat with a yellow-brown coat striped with black, native to the forests of Asia but becoming increasingly rare",
    },
    {
      word:"Umbrella",
      definition:"a device consisting of a circular canopy of cloth on a folding metal frame supported by a central rod, used as protection against rain",
    },
    {
      word:"Van",
      definition:"a medium-sized motor vehicle, typically without side windows in the rear part, for transporting goods",
    },
    {
      word:"Water",
      definition:"a colourless, transparent, odourless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms",
    },
    {
      word:"Yellow",
      definition:"of the colour between green and orange in the spectrum, a primary subtractive colour complementary to blue; coloured like ripe lemons or egg yolks",
    },
    {
      word:"Yacht",
      definition:"a medium-sized sailing boat equipped for cruising or racing",
    },
    {
      word:"Zebra",
      definition:"an African wild horse with black-and-white stripes and an erect mane",
    }
  ]

  constructor(
    private store: Store
  ) { }

  onClick() {
    console.log('click');
    localStorage.setItem('test', 'test');
  }

  ngAfterViewInit() {
    this.store.dispatch(new SetPractice());

  }

}
