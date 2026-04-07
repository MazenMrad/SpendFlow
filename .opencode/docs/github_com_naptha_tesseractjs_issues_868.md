# NextJS project fails to build when using Tesseract.js · Issue #868 · naptha/tesseract.js · GitHub

> Source: https://github.com/naptha/tesseract.js/issues/868
> Cached: 2026-04-07T21:07:47.733Z

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
      

  

    

      
  

  
  

    
    

    
      
    

  

  
  
  # NextJS project fails to build when using Tesseract.js #868

New issueCopy linkNew issueCopy linkClosedClosed[NextJS project fails to build when using Tesseract.js](#top)#868Copy link[](https://github.com/fmercille)## Description

[](https://github.com/fmercille)[fmercille](https://github.com/fmercille)opened [on Jan 5, 2024](https://github.com/naptha/tesseract.js/issues/868#issue-2066727959)Issue body actions**Tesseract.js version (version number for npm/GitHub release, or specific commit for repo)**

5.0.4
**Describe the bug**

A NextJS app using tesseract.js will fail to build with error `Cannot find module '/my-dev-folder/.next/server/app/worker-script/node/index.js'`
**To Reproduce**

Steps to reproduce the behavior:

- Clone the following repo which I created to illustrate this bug: [https://github.com/fmercille/tesseract-js-nextjs](https://github.com/fmercille/tesseract-js-nextjs)

- In the project folder, run `yarn install` to install the dependencies

- Run `yarn build` to build the NextJS app

- See error

**Expected behavior**

I would expect to be able to use tesseract.js in a NextJS application.
**Device Version:**

- OS + Version: Ubuntu 22.04.3 LTS

**Additional context**

The project was created using `npx create-next-app@latest tesseract-js-nextjs` and accepting all the default values. The file that uses tesseract.js is `/src/app/api/tesseract/route.ts`. It includes reading a file into a buffer, creating a worker and then recognizing the buffer, but in reality, only creating the worker is enough to make the build fail.Reactions are currently unavailable## Metadata

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