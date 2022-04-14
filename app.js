const valo_list = document.querySelector('.valo_list')
const parent_list = document.querySelector('#parent_list')
const parent_image = document.querySelector('.image_container')
const agentImage = document.getElementById('agentImage')
const agent_content = document.querySelector('#content')
const audioSrc =  document.querySelector('#audioSource')
const audio  =  document.querySelector('#audio')
const abilities  =  document.querySelector('.abilities_container')
const role_mobile = document.querySelector('.role_mobile')

const getTodos = async () => {
    const response = await fetch('https://valorant-api.com/v1/agents/')
    const data = await response.json();
    agent = data.data.map((result, index) =>( result ))
    
    displayName(agent)
};

const displayName = (agent) => {
    // const filteragent = agent.filter(myagent => myagent.isPlayableCharacter == true)

    // const htmlNavNames = filteragent.map((agent,index) => `
    //     <div data-id="${agent.uuid}" class="swiper-slide">
    //             <h3>${agent.displayName.toUpperCase()}</h3>
    //             <h3 style="font-size:15px;">${(index+1).toString().padStart(2, '0')}</h3>
    //     </div>
    // `)
    // parent_list.innerHTML = htmlNavNames

}

const getTheIndex = (SliderIndex) => {
    const getArray = async () => {
        const response = await fetch('https://valorant-api.com/v1/agents/')
        const data = await response.json();
        agentData = data.data.map((result, index) =>( result ))
        
        displayImage(agentData)
    };
    const displayImage = (agent) => {
        const filteragent = agent.filter((myagent) => myagent.isPlayableCharacter == true)
        const displayIndexImage = filteragent.filter((image,index) => index == SliderIndex)
        const DisplayImageHTML = displayIndexImage.map((result,index) => `
        <img id="agentImage" src="${result.fullPortraitV2}" alt="random" style="visibility:visible;opacity:1;">
        `)
        const agentAudio = displayIndexImage.map((result,index) => result.voiceLine.mediaList)
        
        // console.log(filteragent)
    
        const mapVoice = agentAudio.map((aud,index) => aud[0].wave)
        const agentContentHTML = displayIndexImage.map((res,index) => `
            <div class="role">
                <span>// ROLE</span>
                <span>${res.role.displayName.toUpperCase()}</span>
            </div>
            <div class="bio">
                <span>// BIOGRAPHY</span>
                <span>${res.description}</span>
            </div>
        `)
        audioSrc.src = mapVoice
        parent_image.innerHTML = DisplayImageHTML
        // agentImage.parentElement.classList.add('active')
        parent_image.classList.add('active')
        agent_content.innerHTML = agentContentHTML
        audio.load(); //call this to just preload the audio without playing
        audio.play();

        role_mobile.innerHTML = agentContentHTML


        const abilitiesResult = displayIndexImage.map((result,index) => `
            <div class="abilities_wrapper">
                <h3>SPECIAL ABILITIES</h3>
                <div class="ability_list">
                    <li class="skills activeLi" data-index="${0}"><img src="${result.abilities[0].displayIcon}" alt=""></li>
                    <li class="skills" data-index="${1}"><img src="${result.abilities[1].displayIcon}" alt=""></li>
                    <li class="skills" data-index="${2}"><img src="${result.abilities[2].displayIcon}" alt=""></li>
                    <li class="skills" data-index="${3}"><img src="${result.abilities[3].displayIcon}" alt=""></li>
                </div>
                <div class="ability_content">
                    <div class="title">Q - ${result.abilities[0].displayName}</div>
                    <span class="desc">${result.abilities[0].description}</span>
                </div>
            </div>
        `)
        abilities.innerHTML = abilitiesResult
        const title  =  document.querySelector('.title')
        const desc  =  document.querySelector('.desc')
        const skill1 = displayIndexImage.map(skill => `Q - ${skill.abilities[0].displayName}`)
        const skill2 = displayIndexImage.map(skill => `E - ${skill.abilities[1].displayName}`)
        const skill3 = displayIndexImage.map(skill => `C - ${skill.abilities[2].displayName}`)
        const skill4 = displayIndexImage.map(skill => `X - ${skill.abilities[3].displayName}`)

        const desc1 = displayIndexImage.map(skill => `${skill.abilities[0].description}`)
        const desc2 = displayIndexImage.map(skill => `${skill.abilities[1].description}`)
        const desc3 = displayIndexImage.map(skill => `${skill.abilities[2].description}`)
        const desc4 = displayIndexImage.map(skill => `${skill.abilities[3].description}`)

        const li = document.querySelectorAll('[data-index]')

        li.forEach(i => {
            let key = i.getAttribute("data-index")
            i.addEventListener('click', () => {
                li.forEach(i => {
                    i.classList.remove('activeLi')
                })
                i.classList.add('activeLi')

                if(key == 0){
                    title.innerHTML = skill1
                    desc.innerHTML = desc1
                }else if(key == 1){
                    title.innerHTML = skill2
                    desc.innerHTML = desc2
                }
                else if(key == 2){
                    title.innerHTML = skill3
                    desc.innerHTML = desc3
                }
                else if(key == 3){
                    title.innerHTML = skill4
                    desc.innerHTML = desc4
                }
            })
        })
    }
    
   
    getArray()
    

}

// const displayApi = async () => {
//     const response = await fetch('https://status.henrikdev.xyz/')
//     const data = await response.json();
//     api = data.data.map((result, index) =>( result ))
    
//     console.log(api)
// };
// displayApi()
getTodos();