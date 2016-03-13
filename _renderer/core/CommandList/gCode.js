module.exports = [
	{ tab: "Control", cat: "Move", gcode: "G0", name: "Move", arg: "X<#> Y<#> Z<#> E<#>", duplicate: true },
	{ tab: "Control", cat: "Move", gcode: "G1", name: "Move", arg: "X<#> Y<#> Z<#> E<#>" },
	{ tab: "Control", cat: "Move", gcode: "G2", name: "Clockwise arc" },
	{ tab: "Control", cat: "Move", gcode: "G3", name: "Counter-clockwise arc" },
	
	{ tab: "Control", cat: "Home", gcode: "G28", name: "Home axes", arg: "<X> <Y> <Z> or blank for all" },
	
	{ tab: "Control", cat: "Fan", gcode: "M106", name: "Fan speed set", arg: "S<0-255>" },
	{ tab: "Control", cat: "Fan", gcode: "M107", name: "Fan off", duplicate: true },
	
	{ tab: "Control", cat: "Laser", gcode: "M3", name: "Laser power set", arg: "S<0-255>" },
	{ tab: "Control", cat: "Laser", gcode: "M4", name: "Turn on laser", duplicate: true },
	{ tab: "Control", cat: "Laser", gcode: "M5", name: "Turn off laser", duplicate: true },
	
	{ tab: "Control", cat: "Emergency", gcode: "M112", name: "Emergency stop", arg: null },
	
	{ tab: "Control", cat: "Queue", gcode: "M410", name: "Abort all planned moves", arg: null },
	
	{ tab: "Settings", cat: "Speed", gcode: "M92", name: "Axis steps per unit", arg: "X<#> Y<#> Z<#> E<#>" },
	{ tab: "Settings", cat: "Speed", gcode: "M201", name: "Max acceleration for print moves", arg: "X<#> Y<#> Z<#> E<#> (s^2)" },
	{ tab: "Settings", cat: "Speed", gcode: "M203", name: "Maximum feedrate", arg: "X<#> Y<#> Z<#> E<#> (mm/sec)" },
	{ tab: "Settings", cat: "Speed", gcode: "M204", name: "Acceleration set", arg: "P<#> R<#> T<#> (Printing Retract Travel) (mm/sec^2)" },
	{ tab: "Settings", cat: "Speed", gcode: "M205", name: "Advanced settings set", arg: "S = Min feed rate (mm/s) T = Min travel feed rate (mm/s) B = Min segment time (µs) X = Max XY jerk (mm/s/s) Z = Max Z jerk (mm/s/s) E = Max E jerk (mm/s/s)" },
	{ tab: "Settings", cat: "Speed", gcode: "M220", name: "Speed factor set", arg: "S<0-100>" },
	
	{ tab: "Settings", cat: "EEPROM", gcode: "M500", name: "Save settings" },
	{ tab: "Settings", cat: "EEPROM", gcode: "M501", name: "Read settings" },
	{ tab: "Settings", cat: "EEPROM", gcode: "M503", name: "Read settings from memory" },
	{ tab: "Settings", cat: "EEPROM", gcode: "M502", name: "Revert to default" },
	
	{ tab: "Coordinates", cat: "Position", gcode: "M114", name: "Get current position" },
	{ tab: "Coordinates", cat: "Position", gcode: "G92", name: "Set current position", arg: "X<#> Y<#> Z<#> E<#>" },
	
	{ tab: "Coordinates", cat: "Relative absolute", gcode: "G90", name: "Absolute coordinates (default)" },
	{ tab: "Coordinates", cat: "Relative absolute", gcode: "G91", name: "Relative coordinates" },
	{ tab: "Coordinates", cat: "Relative absolute", gcode: "M82", name: "Absolute E axis (default)" },
	{ tab: "Coordinates", cat: "Relative absolute", gcode: "M83", name: "Relative E axis" },
	
	{ tab: "Coordinates", cat: "Position memory", gcode: "G60", name: "Store actual coordinates in memory" },
	{ tab: "Coordinates", cat: "Position memory", gcode: "G61", name: "Move to coordinates in memory" },
	
	{ tab: "Temperature", cat: "Temperature", gcode: "M105", name: "Read temperature" },
	{ tab: "Temperature", cat: "Temperature", gcode: "M104", name: "Extruder temperature set", arg: "S<temp>" },
	{ tab: "Temperature", cat: "Temperature", gcode: "M109", name: "Wait for extruder to reach temperature", arg: "S<temp>" },
	{ tab: "Temperature", cat: "Temperature", gcode: "M140", name: "Bed temperature set", arg: "S<temp>" },
	{ tab: "Temperature", cat: "Temperature", gcode: "M190", name: "Wait for bed to reach temperature", arg: "S<temp>" },
	{ tab: "Temperature", cat: "Temperature", gcode: "M302", name: "Minimum extrude temperature", arg: "S<temp> (0 to disable)" },
	
	{ tab: "Extruder", cat: "Extruder", gcode: "M221", name: "Set extrusion percentage", arg: "T<#> S<0-100>" },
	{ tab: "Extruder", cat: "Extruder", gcode: "M218", name: "Extruder offset", arg: "T<extruder_number> X<offset> Y<offset> (in mm)" },
	
	{ tab: "Queue", cat: "Queue", gcode: "G4", name: "Do nothing", arg: "S<seconds> or P<milliseconds>" },
	{ tab: "Queue", cat: "Queue", gcode: "M400", name: "Finish all moves" },
	{ tab: "Queue", cat: "Queue", gcode: "M226", name: "Wait for pin state", arg: "P<pin> S<state>" },
	
	{ tab: "Power & pins", cat: "Power & pins", gcode: "M80", name: "Turn on power" },
	{ tab: "Power & pins", cat: "Power & pins", gcode: "M81", name: "Turn off power" },
	{ tab: "Power & pins", cat: "Power & pins", gcode: "M17", name: "Turn on stepper motors" },
	{ tab: "Power & pins", cat: "Power & pins", gcode: "M18", name: "Turn off stepper motors" },
	{ tab: "Power & pins", cat: "Power & pins", gcode: "M84", name: "Turn off stepper motors", duplicate: true },
	{ tab: "Power & pins", cat: "Power & pins", gcode: "M85", name: "Inactivity shutdown timer set", arg: "S<seconds> (0 to disable)" },
	{ tab: "Power & pins", cat: "Power & pins", gcode: "M42", name: "Set pin value", arg: "P<x> S<y> (no pin then LED is used)" },
	
	{ tab: "Misc", cat: "Misc", gcode: "M111", name: "Debug mode" },
	{ tab: "Misc", cat: "Misc", gcode: "M115", name: "Capabilities" },
	{ tab: "Misc", cat: "Misc", gcode: "M280", name: "Servo position get/set", arg: "P<index> S<angle>" },
	{ tab: "Misc", cat: "Misc", gcode: "M300", name: "Play beep sound", arg: "S<frequency Hz> P<duration ms>" },
	{ tab: "Misc", cat: "Misc", gcode: "M11", name: "Start printing" },
	{ tab: "Misc", cat: "Misc", gcode: "M31", name: "Time since card print or last wait temperature" },
	
	{ tab: "PID", cat: "PID", gcode: "M301", name: "PID parameters set" },
	{ tab: "PID", cat: "PID", gcode: "M304", name: "Bed PID parameters set" },
	{ tab: "PID", cat: "PID", gcode: "M303", name: "PID relay autotune" },
	
	{ tab: "Endstops", cat: "Endstops", gcode: "M119", name: "Endstop states" },
	{ tab: "Endstops", cat: "Endstops", gcode: "M120", name: "Enable endstops" },
	{ tab: "Endstops", cat: "Endstops", gcode: "M121", name: "Disable endstops" },
	{ tab: "Endstops", cat: "Endstops", gcode: "M666", name: "Delta endstop and geometry adjustment set" },
	
	{ tab: "Retract", cat: "Retract", gcode: "M200", name: "E axis cubic millimeters set", arg: "T<extruder> D<millimeters> (S0=back to millimeters)" },
	{ tab: "Retract", cat: "Retract", gcode: "G10", name: "Retract filament" },
	{ tab: "Retract", cat: "Retract", gcode: "G11", name: "Retract filament", duplicate: true },
	{ tab: "Retract", cat: "Retract", gcode: "M207", name: "Retract length set", arg: "S[positive mm] F[feedrate mm/min] Z[additional zlift/hop]" },
	{ tab: "Retract", cat: "Retract", gcode: "M208", name: "Retract recover length set", arg: "S[positive mm surplus to the M207 S*] F[feedrate mm/min]" },
	{ tab: "Retract", cat: "Retract", gcode: "M209", name: "Enable automatic retract", arg: "S1" },
 	
	{ tab: "Bed leveling", cat: "Bed leveling", gcode: "G29", name: "Probe bed at 3 or more points" },
	{ tab: "Bed leveling", cat: "Bed leveling", gcode: "G30", name: "Probe bed at current XY location" },
	{ tab: "Bed leveling", cat: "Bed leveling", gcode: "M666", name: "Z probe offset set" },
	
	{ tab: "Z-Probe", cat: "Z-Probe", gcode: "G29", name: "Probes the bed at more points" },
	{ tab: "Z-Probe", cat: "Z-Probe", gcode: "G30", name: "Delta auto calibration" },
	{ tab: "Z-Probe", cat: "Z-Probe", gcode: "M49", name: "Z-Probe repeatability measurement", arg: "<P#> <X#> <Y#> <V#> <E> <L#>" },
	
	{ tab: "Memory card", cat: "Memory card", gcode: "M21", name: "Init card" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M20", name: "List card" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M22", name: "Release card" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M23", name: "Select file" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M24", name: "Start card print" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M25", name: "Pause card print" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M26", name: "Set card file index" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M27", name: "Get card status" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M28", name: "Start card write" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M29", name: "Stop card write" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M30", name: "Delete card file", arg: "<filename>" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M32", name: "Select file and start print" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M928", name: "Start card write" },
	{ tab: "Memory card", cat: "Memory card", gcode: "M540", name: "Card print should abort on endstop hit", arg: "S<0|1>" },
	
	{ tab: "LCD", cat: "LCD", gcode: "M0", name: "Unconditional wait for button press" },
	{ tab: "LCD", cat: "LCD", gcode: "M1", name: "Conditional wait for button press" },
	{ tab: "LCD", cat: "LCD", gcode: "M117", name: "Message set" },
	{ tab: "LCD", cat: "LCD", gcode: "M145", name: "Heatup state for material", arg: "S<0=PLA|1=ABS|2=GUM> H<hotend temp> B<bed temp> F<fan speed> Material " },
	{ tab: "LCD", cat: "LCD", gcode: "M250", name: "Contrast read/set" },
	
	{ tab: "Scara", cat: "Scara", gcode: "M360", name: "Move to cal-position ThetaA", arg: "(0 deg calibration)" },
	{ tab: "Scara", cat: "Scara", gcode: "M361", name: "Move to cal-position ThetaB", arg: "(90 deg calibration - steps per degree)" },
	{ tab: "Scara", cat: "Scara", gcode: "M362", name: "Move to cal-position PsiA", arg: "(0 deg calibration)" },
	{ tab: "Scara", cat: "Scara", gcode: "M363", name: "Move to cal-position PsiB", arg: "(90 deg calibration - steps per degree)" },
	{ tab: "Scara", cat: "Scara", gcode: "M364", name: "Move to cal-position PSIC", arg: "(90 deg to Theta calibration position)" },
	{ tab: "Scara", cat: "Scara", gcode: "M365", name: "Scaling factor set" },
	
	{ tab: "Paste Extruder", cat: "Paste Extruder", gcode: "M126", name: "Heater 1 valve open" },
	{ tab: "Paste Extruder", cat: "Paste Extruder", gcode: "M127", name: "Heater 1 valve close" },
	{ tab: "Paste Extruder", cat: "Paste Extruder", gcode: "M128", name: "Heater 2 valve open" },
	{ tab: "Paste Extruder", cat: "Paste Extruder", gcode: "M129", name: "Heater 2 valve close" },
	
	{ tab: "Filament sensor", cat: "Filament sensor", gcode: "M404", name: "Nominal filament width read/set" },
	{ tab: "Filament sensor", cat: "Filament sensor", gcode: "M405", name: "Turn on filament sensor" },
	{ tab: "Filament sensor", cat: "Filament sensor", gcode: "M406", name: "Turn off filament sensor" },
	{ tab: "Filament sensor", cat: "Filament sensor", gcode: "M407", name: "Measured filament diameter get" },
	
	{ tab: "Servo leveling", cat: "Servo leveling", gcode: "M401", name: "Engage Z servo endstop" },
	{ tab: "Servo leveling", cat: "Servo leveling", gcode: "M402", name: "Retract Z servo endstop" },
	
	{ tab: "Multiple filaments", cat: "Multiple filaments", gcode: "M600", name: "Pause for filament change", arg: "X[pos] Y[pos] Z[relative lift] E[initial retract] L[later retract distance for removal]" },
	{ tab: "Multiple filaments", cat: "Multiple filaments", gcode: "M997", name: "Move carter", arg: "C<#>" },
	
	{ tab: "Other", cat: "Microsteps", gcode: "M350", name: "Microstepping mode set", arg: "S<#> sets stepping mode for all drivers, steps per unit unchanged" },
	{ tab: "Other", cat: "Microsteps", gcode: "M351", name: "Toggle MS1 MS2 directly", arg: "X Y Z E B" },
	
	{ tab: "Other", cat: "Solenoid", gcode: "M380", name: "Enable solenoid" },
	{ tab: "Other", cat: "Solenoid", gcode: "M381", name: "Disable solenoids" },
	
	{ tab: "Other", cat: "Digital trimpot", gcode: "M907", name: "Digital trimpot motor current set", arg: "X, Y, Z, E, B, S" },
	{ tab: "Other", cat: "Digital trimpot", gcode: "M908", name: "Control digital trimpot", arg: "P<pin> S<current>" },
	
	{ tab: "Other", cat: "Dual X carriage", gcode: "M605", name: "Dual x-carriage movement mode set" },
	
	{ tab: "Other", cat: "BlinkM", gcode: "M150", name: "BlinkM status LED Color" },
	
	{ tab: "Other", cat: "Camera", gcode: "M240", name: "Trigger camera" },
	
	{ tab: "Other", cat: "Home", gcode: "M206", name: "Additional homing offset", arg: "SCARA aliases T=X, P=Y" },
	{ tab: "Other", cat: "Home", gcode: "M428", name: "Apply current_position to home_offset" },
	
	{ tab: "Other", cat: "Emergency", gcode: "M999", name: "Restart" },
]
