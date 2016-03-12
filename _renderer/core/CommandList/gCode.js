module.exports.commands = {
	// Movement
	"G0": {
		"title": "Move",
		"arg": "X<#> Y<#> Z<#> E<#>",
		"cat": "Movement",
		"duplicate": true,
	},
	"G1": {
		"title": "Move",
		"arg": "X<#> Y<#> Z<#> E<#>",
		"cat": "Movement",
	},
	"G2": {
		"title": "Clockwise arc",
		"cat": "Movement",
	},
	"G3": {
		"title": "Counter-clockwise arc",
		"cat": "Movement",
	},
	
	// Home
	"G28": {
		"title": "Home axes",
		"arg": "<X> <Y> <Z> or blank for all",
		"cat": "Home",
	},
	"M206": {
		"title": "Additional homing offset",
		"arg": "SCARA aliases T=X, P=Y",
		"cat": "Home",
	},
	"M428": {
		"title": "Apply current_position to home_offset",
		"cat": "Home",
	},
	
	// Position
	"M114": {
		"title": "Get current position",
		"cat": "Position",
	},
	"G92": {
		"title": "Set current position",
		"arg": "X<#> Y<#> Z<#> E<#>",
		"cat": "Position",
	},
	"G60": {
		"title": "Store in memory actual position (X, Y, Z)",
		"cat": "Position",
	},
	"G61": {
		"title": "Move to position in memory (X, Y, Z)",
		"cat": "Position",
	},
	
	// Relative & absolute
	"G90": {
		"title": "Absolute coordinates (default)",
		"cat": "Relative & absolute",
	},
	"G91": {
		"title": "Relative coordinates",
		"cat": "Relative & absolute",
	},
	"M82": {
		"title": "E axis absolute (default)",
		"cat": "Relative & absolute",
	},
	"M83": {
		"title": "E axis relative",
		"cat": "Relative & absolute",
	},
	
	// Speed
	"M92": {
		"title": "Axis steps per unit",
		"arg": "X<#> Y<#> Z<#> E<#>",
		"cat": "Speed",
	},
	"M201": {
		"title": "Max acceleration for print moves",
		"arg": "X<#> Y<#> Z<#> E<#> (s^2)",
		"cat": "Speed",
	},
	"M203": {
		"title": "Maximum feedrate",
		"arg": "X<#> Y<#> Z<#> E<#> (mm/sec)",
		"cat": "Speed",
	},
	"M204": {
		"title": "Acceleration set",
		"arg": "P<#> R<#> T<#> (Printing Retract Travel) (mm/sec^2)",
		"cat": "Speed",
	},
	"M205": {
		"title": "Advanced settings set",
		"arg": "S = Min feed rate (mm/s) T = Min travel feed rate (mm/s) B = Min segment time (µs) X = Max XY jerk (mm/s/s) Z = Max Z jerk (mm/s/s) E = Max E jerk (mm/s/s)",
		"cat": "Speed",
	},
	"M220": {
		"title": "Speed factor set",
		"arg": "S<0-100>",
		"cat": "Speed",
	},
	
	// Temperature
	"M105": {
		"title": "Read temperature",
		"cat": "Temperature",
	},
	"M104": {
		"title": "Extruder temperature set",
		"arg": "S<temp>",
		"cat": "Temperature",
	},
	"M109": {
		"title": "Wait for extruder to reach temperature",
		"arg": "S<temp>",
		"cat": "Temperature",
	},
	"M140": {
		"title": "Bed temperature set",
		"arg": "S<temp>",
		"cat": "Temperature",
	},
	"M190": {
		"title": "Wait for bed to reach temperature",
		"arg": "S<temp>",
		"cat": "Temperature",
	},
	"M302": {
		"title": "Minimum extrude temperature",
		"arg": "S<temp> (0 to disable)",
		"cat": "Temperature",
	},
	
	// Fan
	"M106": {
		"title": "Fan speed set",
		"arg": "S<0-255>",
		"cat": "Fan",
	},
	"M107": {
		"title": "Fan off",
		"cat": "Fan",
	},
	
	// Extruder
	"M221": {
		"title": "Set extrusion percentage",
		"arg": "T<#> S<0-100>",
		"cat": "Extruder",
	},
	"M218": {
		"title": "Extruder offset",
		"arg": "T<extruder_number> X<offset> Y<offset> (in mm)",
		"cat": "Extruder",
	},
	
	// Queue
	"G4": {
		"title": "Do nothing",
		"arg": "S<seconds> or P<milliseconds>",
		"cat": "Queue",
	},
	"M400": {
		"title": "Finish all moves",
		"cat": "Queue",
	},
	"M226": {
		"title": "Wait for pin state",
		"arg": "P<pin> S<state>",
		"cat": "Queue",
	},
	"M410": {
		"title": "Abort all planned moves",
		"cat": "Queue",
	},
	
	// Laser
	"M3": {
		"title": "Laser power set",
		"arg": "S<0-255>",
		"cat": "Laser",
	},
	"M4": {
		"title": "Turn on laser",
		"cat": "Laser",
	},
	"M5": {
		"title": "Turn off laser",
		"cat": "Laser",
	},
	
	// Power & pins
	"M80": {
		"title": "Turn on power",
		"cat": "Power & pins",
	},
	"M81": {
		"title": "Turn off power",
		"cat": "Power & pins",
	},
	"M17": {
		"title": "Turn on stepper motors",
		"cat": "Power & pins",
	},
	"M18": {
		"title": "Turn off stepper motors",
		"cat": "Power & pins",
	},
	"M84": {
		"title": "Turn off stepper motors",
		"cat": "Power & pins",
		"duplicate": true,
	},
	"M85": {
		"title": "Inactivity shutdown timer set",
		"arg": "S<seconds> (0 to disable)",
		"cat": "Power & pins",
	},
	"M42": {
		"title": "Set pin value",
		"arg": "P<x> S<y> (no pin then LED is used)",
		"cat": "Power & pins",
	},
	
	// Emergency
	"M112": {
		"title": "Emergency stop",
		"cat": "Emergency",
	},
	"M999": {
		"title": "Restart",
		"cat": "Emergency",
	},
	
	// Misc
	"M111": {
		"title": "Debug mode",
		"cat": "Misc",
	},
	"M115": {
		"title": "Capabilities",
		"cat": "Misc",
	},
	"M280": {
		"title": "Servo position get/set",
		"arg": "P<index> S<angle>",
		"cat": "Misc",
	},
	"M300": {
		"title": "Play beep sound",
		"arg": "S<frequency Hz> P<duration ms>",
		"cat": "Misc",
	},
	"M11": {
		"title": "Start printing",
		"cat": "Misc",
	},
	"M31": {
		"title": "Time since card print or last wait temperature",
		"cat": "Misc",
	},
	
	// EEPROM
	"M500": {
		"title": "Save settings",
		"cat": "EEPROM",
	},
	"M501": {
		"title": "Read settings",
		"cat": "EEPROM",
	},
	"M503": {
		"title": "Read settings from memory",
		"cat": "EEPROM",
	},
	"M502": {
		"title": "Revert to default",
		"cat": "EEPROM",
	},
	
	// Endstops
	"M119": {
		"title": "Endstop states",
		"cat": "Endstops",
	},
	"M120": {
		"title": "Enable endstops",
		"cat": "Endstops",
	},
	"M121": {
		"title": "Disable endstops",
		"cat": "Endstops",
	},
	"M666": {
		"title": "Delta endstop and geometry adjustment set",
		"cat": "Endstops",
	},
	
	// PID
	"M301": {
		"title": "PID parameters set",
		"cat": "PID",
	},
	"M304": {
		"title": "Bed PID parameters set",
		"cat": "PID",
	},
	"M303": {
		"title": "PID relay autotune",
		"cat": "PID",
	},
	
	// Rectract
	"M200": {
		"title": "E axis cubic millimeters set",
		"arg": "T<extruder> D<millimeters> (S0=back to millimeters)",
		"cat": "Retract",
	},
	"G10": {
		"title": "Retract filament",
		"cat": "Retract",
	},
	"G11": {
		"title": "Retract filament",
		"cat": "Retract",
		"duplicate": true,
	},
	"M207": {
		"title": "Retract length set",
		"arg": "S[positive mm] F[feedrate mm/min] Z[additional zlift/hop]",
		"cat": "Retract",
	},
	"M208": {
		"title": "Retract recover length set",
		"arg": "S[positive mm surplus to the M207 S*] F[feedrate mm/min]",
		"cat": "Retract",
	},
	"M209": {
		"title": "Enable automatic retract",
		"arg": "S1",
		"cat": "Retract",
	},
 	
	// Bed leveling
	"G29": {
		"title": "Probe bed at 3 or more points",
		"cat": "Bed leveling",
	},
	"G30": {
		"title": "Probe bed at current XY location",
		"cat": "Bed leveling",
	},
	"M666": {
		"title": "Z probe offset set",
		"cat": "Bed leveling",
	},
	
	// Z-Probe
	"G29": {
		"title": "Probes the bed at more points",
		"cat": "Z-Probe",
	},
	"G30": {
		"title": "Delta auto calibration",
		"cat": "Z-Probe",
	},
	"M49": {
		"title": "Z-Probe repeatability measurement",
		"arg": "<P#> <X#> <Y#> <V#> <E> <L#>",
		"cat": "Z-Probe",
	},
	
	// Memory card
	"M21": {
		"title": "Init card",
		"cat": "Memory card",
	},
	"M20": {
		"title": "List card",
		"cat": "Memory card",
	},
	"M22": {
		"title": "Release card",
		"cat": "Memory card",
	},
	"M23": {
		"title": "Select file",
		"cat": "Memory card",
	},
	"M24": {
		"title": "Start card print",
		"cat": "Memory card",
	},
	"M25": {
		"title": "Pause card print",
		"cat": "Memory card",
	},
	"M26": {
		"title": "Set card file index",
		"cat": "Memory card",
	},
	"M27": {
		"title": "Get card status",
		"cat": "Memory card",
	},
	"M28": {
		"title": "Start card write",
		"cat": "Memory card",
	},
	"M29": {
		"title": "Stop card write",
		"cat": "Memory card",
	},
	"M30": {
		"title": "Delete card file",
		"arg": "<filename>",
		"cat": "Memory card",
	},
	"M32": {
		"title": "Select file and start print",
		"cat": "Memory card",
	},
	"M928": {
		"title": "Start card write",
		"cat": "Memory card",
	},
	"M540": {
		"title": "Card print should abort on endstop hit",
		"arg": "S<0|1>",
		"cat": "Memory card",
	},
	
	// LCD
	"M0": {
		"title": "Unconditional wait for button press",
		"cat": "LCD",
	},
	"M1": {
		"title": "Conditional wait for button press",
		"cat": "LCD",
	},
	"M117": {
		"title": "Message set",
		"cat": "LCD",
	},
	"M145": {
		"title": "Heatup state for material",
		"arg": "S<0=PLA|1=ABS|2=GUM> H<hotend temp> B<bed temp> F<fan speed> Material ",
		"cat": "LCD",
	},
	"M250": {
		"title": "Contrast read/set",
		"cat": "LCD",
	},
	
	// Paste Extruder
	"M126": {
		"title": "Heater 1 valve open",
		"cat": "Paste Extruder",
	},
	"M127": {
		"title": "Heater 1 valve close",
		"cat": "Paste Extruder",
	},
	"M128": {
		"title": "Heater 2 valve open",
		"cat": "Paste Extruder",
	},
	"M129": {
		"title": "Heater 2 valve close",
		"cat": "Paste Extruder",
	},
	
	// Microsteps
	"M350": {
		"title": "Microstepping mode set",
		"arg": "S<#> sets stepping mode for all drivers, steps per unit unchanged",
		"cat": "Microsteps",
	},
	"M351": {
		"title": "Toggle MS1 MS2 directly",
		"arg": "X Y Z E B",
		"cat": "Microsteps",
	},
	
	// Scara
	"M360": {
		"title": "Move to cal-position ThetaA",
		"arg": "(0 deg calibration)",
		"cat": "Scara",
	},
	"M361": {
		"title": "Move to cal-position ThetaB",
		"arg": "(90 deg calibration - steps per degree)",
		"cat": "Scara",
	},
	"M362": {
		"title": "Move to cal-position PsiA",
		"arg": "(0 deg calibration)",
		"cat": "Scara",
	},
	"M363": {
		"title": "Move to cal-position PsiB",
		"arg": "(90 deg calibration - steps per degree)",
		"cat": "Scara",
	},
	"M364": {
		"title": "Move to cal-position PSIC",
		"arg": "(90 deg to Theta calibration position)",
		"cat": "Scara",
	},
	"M365": {
		"title": "Scaling factor set",
		"cat": "Scara",
	},
	
	// Solenoid
	"M380": {
		"title": "Enable solenoid",
		"cat": "Solenoid",
	},
	"M381": {
		"title": "Disable solenoids",
		"cat": "Solenoid",
	},
	
	// Servo leveling
	"M401": {
		"title": "Engage Z servo endstop",
		"cat": "Servo leveling",
	},
	"M402": {
		"title": "Retract Z servo endstop",
		"cat": "Servo leveling",
	},
	
	// Filament sensor
	"M404": {
		"title": "Nominal filament width read/set",
		"cat": "Filament sensor",
	},
	"M405": {
		"title": "Turn on filament sensor",
		"cat": "Filament sensor",
	},
	"M406": {
		"title": "Turn off filament sensor",
		"cat": "Filament sensor",
	},
	"M407": {
		"title": "Measured filament diameter get",
		"cat": "Filament sensor",
	},
	
	// Multiple filaments
	"M600": {
		"title": "Pause for filament change",
		"arg": "X[pos] Y[pos] Z[relative lift] E[initial retract] L[later retract distance for removal]",
		"cat": "Multiple filaments",
	},
	"M997": {
		"title": "Move carter",
		"arg": "C<#>",
		"cat": "Multiple filaments",
	},
	
	// Dual X carriage
	"M605": {
		"title": "Dual x-carriage movement mode set",
		"cat": "Dual X carriage",
	},
	
	// Digital trimpot
	"M907": {
		"title": "Digital trimpot motor current set",
		"arg": "X, Y, Z, E, B, S",
		"cat": "Digital trimpot",
	},
	"M908": {
		"title": "Control digital trimpot",
		"arg": "P<pin> S<current>",
		"cat": "Digital trimpot",
	},
	
	// BlinkM
	"M150": {
		"title": "Status LED Color",
		"cat": "BlinkM",
	},
	
	// Camera
	"M240": {
		"title": "Trigger camera",
		"cat": "Camera",
	},
}
