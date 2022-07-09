import React from "react";
import styled from 'styled-components';

//this is not pure javascript 
//babel transform this code 

const Grid = styled.div`
     display: grid;
     grid-template-columns: auto auto auto;
     grid-template-rows: auto auto auto;
     column-gap: 10px;
     row-gap: 10px;
     background-color: lightgray;
`;
const SquareStyle = styled.div`
width: 110px;
height: 110px;
display:flex;
align-items: center;
justify-content: center;
background-color: white;
`;
const Frame = styled.svg`
stroke-width: 15px;
stroke : #FF665C;
fill:none;
stroke-linecap: round;
`;
const Frame2 = styled.svg`
stroke-width: 15px;
stroke : #DD661A;
fill:none;
stroke-linecap: round;
`;
const Panel = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
font-size:3em;
font-weight:bold;
background-color:rgba(0,0,0,0.4);
color: white;

`;

const EMPTY = 'EMPTY';
const CIRCLE = 'CIRCLE';
const CROSS = 'CROSS';
export function  GamePlay(){
        
    function detectWinner(p){
        if(p[0] == CIRCLE && p[1] == CIRCLE && p[2]== CIRCLE) return CIRCLE ;
        if(p[3] == CIRCLE && p[4] == CIRCLE && p[5]== CIRCLE) return CIRCLE ;
        if(p[6] == CIRCLE && p[7] == CIRCLE && p[8]== CIRCLE) return CIRCLE ;
    
        if(p[0] == CIRCLE && p[3] == CIRCLE && p[6]== CIRCLE) return CIRCLE ;
        if(p[1] == CIRCLE && p[4] == CIRCLE && p[7]== CIRCLE) return CIRCLE ;
        if(p[2] == CIRCLE && p[5] == CIRCLE && p[8]== CIRCLE) return CIRCLE ;
    
        if(p[0] == CIRCLE && p[1] == CIRCLE && p[2]== CIRCLE) return CIRCLE ;
        if(p[3] == CIRCLE && p[4] == CIRCLE && p[5]== CIRCLE) return CIRCLE ;
     
        if(p[0] == CIRCLE && p[4] == CIRCLE && p[8]== CIRCLE) return CIRCLE ;
        if(p[2] == CIRCLE && p[4] == CIRCLE && p[6]== CIRCLE) return CIRCLE ;
     
    
        if(p[0] == CROSS && p[1] == CROSS && p[2]== CROSS) return CROSS ;
        if(p[3] == CROSS && p[4] == CROSS && p[5]== CROSS) return CROSS ;
        if(p[6] == CROSS && p[7] == CROSS && p[8]== CROSS) return CROSS ;
    
        if(p[0] == CROSS && p[3] == CROSS && p[6]== CROSS) return CROSS ;
        if(p[1] == CROSS && p[4] == CROSS && p[7]== CROSS) return CROSS ;
        if(p[2] == CROSS && p[5] == CROSS && p[8]== CROSS) return CROSS ;
    
        if(p[0] == CROSS && p[1] == CROSS && p[2]== CROSS) return CROSS ;
        if(p[3] == CROSS && p[4] == CROSS && p[5]== CROSS) return CROSS ;
     
        if(p[0] == CROSS && p[4] == CROSS && p[8]== CROSS) return CROSS ;
        if(p[2] == CROSS && p[4] == CROSS && p[6]== CROSS) return CROSS ;
    
        if(p.every(position => position != EMPTY)) return "It's a tie";
    }

    const [state, setState]= React.useState({
        player: CROSS,
        positions: [
          EMPTY,EMPTY,EMPTY,
          EMPTY,EMPTY,EMPTY,
          EMPTY,EMPTY,EMPTY
        ]
      })
        function takeTurn(position){
        const positions = [...state.positions];
        positions[position] = state.player;

        setState({
            player: state.player == CIRCLE ? CROSS : CIRCLE,
            positions,
        })
        }
        const winner = detectWinner(state.positions);

        function reset(){
            setState({
                player: CROSS,
                positions: [
                  EMPTY,EMPTY,EMPTY,
                  EMPTY,EMPTY,EMPTY,
                  EMPTY,EMPTY,EMPTY
                ]
            })
        }
    return (
        <>
        <Grid>
 
         <Square position ={0} value = {state.positions[0]} takeTurn={takeTurn}/>
         <Square position ={1} value = {state.positions[1]} takeTurn={takeTurn}/>
         <Square position ={2} value = {state.positions[2]} takeTurn={takeTurn}/> 

         <Square position ={3} value = {state.positions[3]} takeTurn={takeTurn}/>
         <Square position ={4} value = {state.positions[4]} takeTurn={takeTurn}/>
         <Square position ={5} value = {state.positions[5]} takeTurn={takeTurn}/>

         <Square position ={6} value = {state.positions[6]} takeTurn={takeTurn}/>
         <Square position ={7} value = {state.positions[7]} takeTurn={takeTurn}/>
         <Square position ={8} value = {state.positions[8]} takeTurn={takeTurn}/>
         </Grid>
         {winner &&<Result winner={winner} reset={reset}/>}
        </>
);
}


export function  Square({position ,value, takeTurn}){
           function handleClick(){
            if(value ==EMPTY) takeTurn(position)
           }
    return (
        <SquareStyle onClick={handleClick}>
            {value== CIRCLE && <Circle/>}
            {value== CROSS   && <Cross/>}
        </SquareStyle>
        );
           
}
export function  Circle(){

    return (
        <Frame width="100" height="100" viewBox="-50 -50 100 100">
            <circle cx="0" cy="0" r="40"/>
        </Frame>
);
}
export function  Cross(){

    return (
        <Frame2 width="100" height="100" viewBox="-50 -50 100 100" >
        <line x1="-40" y1="-40" x2="40" y2="40"/>
        <line x1="-40" y1="40" x2="40" y2="-40"/>
    </Frame2>
);
}
export function  Result({winner, reset}){

    return (
        <>
        <Panel>
            {winner == CIRCLE && 'Circle won the game '}
            {winner == CROSS && 'Cross won the game '}
            {winner == "It's a tie" && '!!!'}
            <button onClick={reset}>Reset</button>
        </Panel>
    
        </>
);
}