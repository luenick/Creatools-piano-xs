Content.makeFrontInterface(816, 520);

/*
	MIT License

	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this file, to deal in the Software without restriction, including without
	limitation the rights	to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell	copies of the Software, and to permit
	persons to whom the Software is	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

Engine.loadFontAs("{PROJECT_FOLDER}Cabin-Regular.ttf", "Cabin-Regular");
Engine.loadFontAs("{PROJECT_FOLDER}Cabin-Bold.ttf", "Cabin-Bold");
Engine.loadFontAs("{PROJECT_FOLDER}LeagueGothic-Regular.ttf", "LeagueGothic-Regular");
Engine.setGlobalFont("Cabin-Bold");

	// VU METER

include("VuMeter.js");
const var v1 = VuMeter.createVuMeter("VuMeter", 0, 0);
VuMeter.setModule(v1, Synth.getEffect("Volume"));

//const var BlurVuMeter = Content.getComponent("BlurVuMeter");
//BlurVuMeter.setPaintRoutine(function(g)
//	{ 
//    	g.beginLayer(true);
//    	g.boxBlur(4.0);
//    	g.endLayer();
//	});


	// MAIN PANELS SETUP

const var NUM_BUTTONS = 4;
const var buttons = [];
const var panels = [];

	for (i = 0; i < NUM_BUTTONS; i++)
	{
		buttons[i] = Content.getComponent("Button" + (i+1));
		panels[i] = Content.getComponent("Panel" + (i+1));
		buttons[i].setControlCallback(onButtonControl);
	}

	inline function onButtonControl(component, value)
	{
		local idx = buttons.indexOf(component);
	
		for (i = 0; i < panels.length; i++)
	{
    	panels[i].showControl(idx == i);
	}
	}  


	// Show Preset Name

const var PresetName = Content.getComponent("PresetName");

	inline function onPHKnobControl(component, value)
	{
		if (Engine.getCurrentUserPresetName() == "")
    	Content.getComponent("PresetName").set("text", "Init");
		else
    	Content.getComponent("PresetName").set("text", Engine.getCurrentUserPresetName());
	};

	Content.getComponent("PHKnob").setControlCallback(onPHKnobControl);

	// Prev and Next Preset Buttons
	
Content.getComponent("NextBtn").setControlCallback(onNextBtnControl);
	inline function onNextBtnControl(component, value)
	{
		if(value == 1)    
		Engine.loadNextUserPreset(false);
	};
		Content.getComponent("PrevBtn").setControlCallback(onPrevBtnControl);
		inline function onPrevBtnControl(component, value)
	{
		if(value == 1)   
		Engine.loadPreviousUserPreset(false);
	};


	// Convolution Reverb Setup

Engine.loadAudioFilesIntoPool();

const Space = Synth.getAudioSampleProcessor("Convolution");
const Impulse = Content.getComponent("Impulse");
const var Select = ["Hall 1", "Hall 2", "Hall 3", "Plate 1", "Plate 2", "Spring", "Studio A", "Studio B"];

Impulse.set("items", Select.join("\n"));   

	inline function onImpulseControl(component, value)
	{
		Space.setFile("{PROJECT_FOLDER}" + Select[value - 1] + ".wav");
	};
	
	Content.getComponent("Impulse").setControlCallback(onImpulseControl);


	// Comvolution String Resonance Setup
	
const Resonance = Synth.getAudioSampleProcessor("Resonance");
const Impulse1 = Content.getComponent("Impulse1");
const var Select2 = ["Resonance model 1", "Resonance model 2", "Resonance model 3"];

Impulse1.set("items", Select2.join("\n"));   

	inline function onImpulse1Control(component, value)
	{
		Resonance.setFile("{PROJECT_FOLDER}" + Select2[value - 1] + ".wav");
	};

	Content.getComponent("Impulse1").setControlCallback(onImpulse1Control);	


	// Setup samplemap comboboxes

		// E1 samplemaps

const var E1 = Synth.getChildSynth("E1Sampler");
const var sampleMaps1 = Sampler.getSampleMapList();

const var Element1 = Content.getComponent("E1SampleMap");
Element1.set("items", sampleMaps1.join("\n"));

	inline function onElement1Control(component, value)
	{
		E1.asSampler().loadSampleMap(sampleMaps1[value-1]);
	};

	Content.getComponent("E1SampleMap").setControlCallback(onElement1Control);

		// E2 samplemaps

const var E2 = Synth.getChildSynth("E2Sampler");
const var sampleMaps2 = Sampler.getSampleMapList();

const var Element2 = Content.getComponent("E2SampleMap");
Element2.set("items", sampleMaps2.join("\n"));

	inline function onElement2Control(component, value)
	{
		E2.asSampler().loadSampleMap(sampleMaps2[value-1]);
	};

	Content.getComponent("E2SampleMap").setControlCallback(onElement2Control);

		// E3 samplemaps

const var E3 = Synth.getChildSynth("E3Sampler");
const var sampleMaps3 = Sampler.getSampleMapList();

const var Element3 = Content.getComponent("E3SampleMap");
Element3.set("items", sampleMaps3.join("\n"));

	inline function onElement3Control(component, value)
	{
		E3.asSampler().loadSampleMap(sampleMaps3[value-1]);
	};

	Content.getComponent("E3SampleMap").setControlCallback(onElement3Control);


	// Filter comboboxes setup

		// Global Filter

const var G_Filter = Synth.getEffect("Global Filter");
const var modes = {"SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14, "Ring mod.": 17, "Low shelf": 2, "High shelf": 3, "Peak EQ": 4,};

const var G1FilterMode = Content.getComponent("G1FilterType");
G1FilterMode.set("items", ""); //Clear list

	for (k in modes)
	{
    	G1FilterMode.addItem(k); //Add mode name to list
	}

	inline function onG1FilterModeControl(component, value)
	{
    	G_Filter.setAttribute(G_Filter.Mode, modes[component.getItemText()]);
	};

	Content.getComponent("G1FilterType").setControlCallback(onG1FilterModeControl);

		// E1 Filter

const var E1_Filter = Synth.getEffect("E1 Filter");
const var modes1 = {"1P lowpass": 9, "1P highpass": 10, "SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14};

const var E1FilterMode = Content.getComponent("E1FilterType");
E1FilterMode.set("items", ""); //Clear list

	for (k in modes1)
	{
    	E1FilterMode.addItem(k); //Add mode name to list
	}

	inline function onE1FilterModeControl(component, value)
	{
    	E1_Filter.setAttribute(E1_Filter.Mode, modes1[component.getItemText()]);
	};

	Content.getComponent("E1FilterType").setControlCallback(onE1FilterModeControl);

		// E2 Filter

const var E2_Filter = Synth.getEffect("E2 Filter");
const var modes2 = {"1P lowpass": 9, "1P highpass": 10, "SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14};

const var E2FilterMode = Content.getComponent("E2FilterType");
E2FilterMode.set("items", ""); //Clear list

	for (k in modes2)
	{
    	E2FilterMode.addItem(k); //Add mode name to list
	}

	inline function onE2FilterModeControl(component, value)
	{
    	E2_Filter.setAttribute(E2_Filter.Mode, modes2[component.getItemText()]);
	};

	Content.getComponent("E2FilterType").setControlCallback(onE2FilterModeControl);

		// E3 Filter

const var E3_Filter = Synth.getEffect("E3 Filter");
const var modes3 = {"1P lowpass": 9, "1P highpass": 10, "SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14};

const var E3FilterMode = Content.getComponent("E3FilterType");
E3FilterMode.set("items", ""); //Clear list

	for (k in modes3)
	{
    	E3FilterMode.addItem(k); //Add mode name to list
	}

	inline function onE3FilterModeControl(component, value)
	{
    	E3_Filter.setAttribute(E3_Filter.Mode, modes3[component.getItemText()]);
	};

	Content.getComponent("E3FilterType").setControlCallback(onE3FilterModeControl);

// Shift slider setup

const var E1Shift = Synth.getModulator("E1Shift")
const var E1Transposer = Synth.getMidiProcessor("E1Transposer");

	inline function onE1_PitchShiftControl(component, value)
	{
		E1Transposer.setAttribute(0, -value);
		E1Shift.setIntensity(value);
	};

Content.getComponent("E1_PitchShift").setControlCallback(onE1_PitchShiftControl);

const var E2Shift = Synth.getModulator("E2Shift")
const var E2Transposer = Synth.getMidiProcessor("E2Transposer");

	inline function onE2_PitchShiftControl(component, value)
	{
		E2Transposer.setAttribute(0, -value);
		E2Shift.setIntensity(value);
	};

Content.getComponent("E2_PitchShift").setControlCallback(onE2_PitchShiftControl);

const var E3Shift = Synth.getModulator("E3Shift")
const var E3Transposer = Synth.getMidiProcessor("E3Transposer");

	inline function onE3_PitchShiftControl(component, value)
	{
		E3Transposer.setAttribute(0, -value);
		E3Shift.setIntensity(value);
	};

Content.getComponent("E3_PitchShift").setControlCallback(onE3_PitchShiftControl);

function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()

{
Resonance.setAttribute(4, Synth.isSustainPedalDown() );	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 