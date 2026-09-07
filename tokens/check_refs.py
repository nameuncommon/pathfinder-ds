import json
data = json.load(open(__file__.replace("check_refs.py", "tokens.json")))
prims = data["primitives"]
flat = set(k for cat in prims.values() for k in cat.keys())
def resolves(ref):
    if ref in flat: return True
    cat, _, key = ref.partition("/")
    return cat in prims and key in prims[cat]
def walk(d):
    for v in d.values():
        if isinstance(v, dict): walk(v)
        elif isinstance(v, str) and v.startswith("{") and v.endswith("}") and not resolves(v[1:-1]):
            print("FAIL", v)
walk(data["semantic"]); walk(data["component"])
print("REF CHECK DONE, no FAIL lines above = all refs resolve")
