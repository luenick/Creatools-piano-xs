 function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	if (Message.getControllerNumber() == 64) //PEDAL
		{
			if (Synth.isSustainPedalDown())
				Synth.playNote(0, 100); //Pedal down plays note number 12 sound at 100 vel			
		}
		{
			if (!Synth.isSustainPedalDown())
				Synth.playNote(1,100);	//Pedal down plays note number 0 sound at 100 vel
		}
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 