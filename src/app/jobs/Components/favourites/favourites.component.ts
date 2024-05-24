import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Job } from '../../Models/job';
import { JobService } from '../../Services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {

  favouritesJobID :number[]=[];
  jobList :Job[]=[];

  constructor(private jobService :JobService, private router :Router){}
  
  ngOnInit(): void {
    let savedFavorites= localStorage.getItem("myFavorites");
  if(savedFavorites){
    this.favouritesJobID=JSON.parse(savedFavorites);  
  }

  this.jobService.getAllJobs().subscribe(responseData=>{
    
    let result=responseData;
    
    for(let i=0; i<result.length; i++)
      {
       for(let j=0;j<this.favouritesJobID.length;j++)
        {
          if(result[i].id==this.favouritesJobID[j])
            {
              this.jobList.push(responseData[i]);
            }
        }
      }
    
    });

  }

  navigateToDetails(id :number){
    let currentJobSelect=this.jobList[id];
    if(currentJobSelect)
      {
        this.router.navigate(['/jobs', currentJobSelect.id]);
      }
   
  }

}
