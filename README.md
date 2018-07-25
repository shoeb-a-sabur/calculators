Contains all the calculators for Klikk.no

## How To Add a Calculator:
To add a calculator in any site, only "calculators.js" needs to be added via `<script></script>` tag while specifying the calculator to be loaded.

Optionally you can also specify the element ID where the calculator should load. If no element ID is specified, then you must add an elmenet with ID `id="calculator-root"` as that will be used as default fallback.

**Example:**
```
<div id="blood-alcohol"></div>
<script type="text/javascript" src="//example.com/calculators/calculators.js" data-calculator="blood-alcohol" data-attach-to="blood-alcohol"></script>
```

## Calculator List:
Following lists all the calculators and their corresponding ID to be passed to `data-calculator` attribute.

- Blood Alcohol Calculator: `blood-alcohol`
- Boy Girl Calculator: `boy-girl`
- Breastfeed Intoxication Calculator: `breastfeed-intoxication`
- Child Height Calculator: `child-height`
- Hip Waist Ratio Calculator: `hip-waist-ratio`
- Ideal Weight Calculator: `ideal-weight`
