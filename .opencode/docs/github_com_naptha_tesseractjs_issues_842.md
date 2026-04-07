# Issue with nextjs app router · Issue #842 · naptha/tesseract.js · GitHub

> Source: https://github.com/naptha/tesseract.js/issues/842
> Cached: 2026-04-07T21:07:47.330Z

---

naptha
    
    /
    
      [tesseract.js](/naptha/tesseract.js)
    

    Public
  

        

        
            

    
        
          
  
  
    
  
    
      

              Uh oh!

              There was an error while loading. [Please reload this page]().

  
  

        

      

  
                
    
Notifications
    You must be signed in to change notification settings

  

  
              
    
Fork
    2.4k

  

  
        
            
    

          Star
          38k

  

        
      

        

          

  

      
  
    
              
    

        Code
          

    

      
  
    
              
    

        Issues
          31

    

      
  
    
              
    

        Pull requests
          11

    

      
  
    
              
    

        Discussions
          

    

      
  
    
              
    

        Actions
          

    

      
  
    
              
    

        Projects
          

    

      
  
    
              
    

        Security and quality
          0

    

      
  
    
              
    

        Insights
          

    

          
  
      
    

Additional navigation options

  
    
                
  
    

        
    
    
    
        
          
    

        
      
        
          Code
      

  

        
    
    
    
        
          
    

        
      
        
          Issues
      

  

        
    
    
    
        
          
    

        
      
        
          Pull requests
      

  

        
    
    
    
        
          
    

        
      
        
          Discussions
      

  

        
    
    
    
        
          
    

        
      
        
          Actions
      

  

        
    
    
    
        
          
    

        
      
        
          Projects
      

  

        
    
    
    
        
          
    

        
      
        
          Security and quality
      

  

        
    
    
    
        
          
    

        
      
        
          Insights
      

  

    

      
  

  
  

    
    

    
      
    

  

  
  
  # Issue with nextjs app router #842

New issueCopy linkNew issueCopy linkClosedClosed[Issue with nextjs app router](#top)#842Copy link[](https://github.com/Hillel-Nagid)## Description

[](https://github.com/Hillel-Nagid)[Hillel-Nagid](https://github.com/Hillel-Nagid)opened [on Oct 17, 2023](https://github.com/naptha/tesseract.js/issues/842#issue-1946723324)Issue body actions**Tesseract.js version (version number for npm/GitHub release, or specific commit for repo)**

5.0.2

**Describe the bug**

I have tried to use the library in a Next.js project using route handlers. I "copy-paste"ed the expamle from the README file, and got the following error when running: uncaughtException: Error: Cannot find module '.next\worker-script\node\index.js'
**To Reproduce**

Steps to reproduce the behavior:

`npx create-next-app@latest`

create a route handler

initialize `createWorker('eng')`

read an image buffer from file, and pass it to `worker.recognize()`
**Expected behavior**

I expected the code to run
**Device Version:**

- OS + Version: Windows 11

- Node version Node v19.4.0

Reactions are currently unavailable## Metadata

## Metadata

### Assignees

No one assigned

### Labels

No labelsNo labels### Type

No type### Projects

No projects### Milestone

No milestone

### Relationships

None yet### Development

No branches or pull requests## Issue actions