# The same `src/` the host build compiles: one interpreter, two places it runs.
#
# `BACKTICK_HEADLESS=1` builds the one an emulator can run — no panel, no
# keyboard, and the drawing printed rather than painted. See `main.cpp`.
if(DEFINED ENV{BACKTICK_HEADLESS})
  set(target_sources "main.cpp" "Show.cpp" "Cardputer.cpp")
else()
  set(target_sources "main.cpp" "Show.cpp" "Cardputer.cpp" "Screen.cpp" "Keyboard.cpp")
endif()

idf_component_register(
  SRCS ${target_sources}
       "../../src/Json.cpp"
       "../../src/Value.cpp"
       "../../src/Interpreter.cpp"
       "../../src/Builtins.cpp"
  INCLUDE_DIRS "." "../../src"
  EMBED_TXTFILES "bundle.json")

if(DEFINED ENV{BACKTICK_HEADLESS})
  target_compile_definitions(${COMPONENT_LIB} PRIVATE BACKTICK_HEADLESS=1)
  idf_component_get_property(lib esp_timer COMPONENT_LIB)
  target_link_libraries(${COMPONENT_LIB} PRIVATE ${lib})
else()
  idf_component_get_property(lib m5stack__m5unified COMPONENT_LIB)
  target_link_libraries(${COMPONENT_LIB} PRIVATE ${lib})
endif()
