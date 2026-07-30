// Generated from the original AEDIS demonstration data.
// All organizations, projects, amounts, and indicators in this local build are illustrative.

export const publicDemoData = {
  "jobs": [
    {
      "id": "WA-SEA-0001",
      "city": "Seattle",
      "state": "WA",
      "category": "Clinic Construction",
      "title": "Beacon Hill Community Clinic",
      "company": "Puget Healthcare Builders",
      "aedis_id": "AEDIS-WA-1003",
      "budget": 4200000,
      "status": "active",
      "claimed_pct": 60,
      "verified_pct": 58,
      "summary": "New 12-room community clinic. On schedule, claims and independent inspections track closely.",
      "payments": [
        {
          "label": "Milestone 1 - foundation",
          "amount": 1100000,
          "note": "Verified by site inspector"
        },
        {
          "label": "Milestone 2 - framing",
          "amount": 1400000,
          "note": "Verified by site inspector"
        }
      ],
      "materials": [
        {
          "item": "Structural steel",
          "spec_claimed": "ASTM A992",
          "spec_delivered": "ASTM A992",
          "note": "Mill certs on file"
        },
        {
          "item": "Concrete",
          "spec_claimed": "5000 psi",
          "spec_delivered": "5000 psi",
          "note": "Batch tickets match"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": "Open bid, 4 bidders"
        },
        {
          "label": "Foundation complete",
          "note": "2 days ahead"
        },
        {
          "label": "Framing in progress",
          "note": ""
        }
      ]
    },
    {
      "id": "WA-SEA-0002",
      "city": "Seattle",
      "state": "WA",
      "category": "Road Construction",
      "title": "Rainier Ave S Repaving",
      "company": "Sound Paving & Grading",
      "aedis_id": "AEDIS-WA-1006",
      "budget": 1850000,
      "status": "completed",
      "claimed_pct": 100,
      "verified_pct": 100,
      "summary": "2.1 mile repave. Completed slightly under budget - contractor hit a good asphalt price. (Looks 'off' but is legitimately efficient.)",
      "payments": [
        {
          "label": "Completion",
          "amount": 1720000,
          "note": "Final spend below budget - surplus returned"
        }
      ],
      "materials": [
        {
          "item": "Hot-mix asphalt",
          "spec_claimed": "HMA Class 1/2in",
          "spec_delivered": "HMA Class 1/2in",
          "note": "Tonnage matches survey"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Completed",
          "note": "Returned $130k surplus to region pool"
        }
      ]
    },
    {
      "id": "WA-SEA-0003",
      "city": "Seattle",
      "state": "WA",
      "category": "Road Construction",
      "title": "West Seattle Bridge Approach Resurfacing",
      "company": "Cascade Surface Co.",
      "aedis_id": "AEDIS-WA-3107",
      "budget": 2600000,
      "status": "active",
      "claimed_pct": 75,
      "verified_pct": 72,
      "summary": "Resurfacing project, reportedly on track. Payments and progress look ordinary at a glance.",
      "payments": [
        {
          "label": "Milestone 1",
          "amount": 900000,
          "note": "Approved"
        },
        {
          "label": "Milestone 2",
          "amount": 1000000,
          "note": "Approved"
        }
      ],
      "materials": [
        {
          "item": "Asphalt binder",
          "spec_claimed": "PG 70-22 (polymer-modified)",
          "spec_delivered": "PG 64-22 (standard)",
          "note": "Delivery ticket grade differs from contracted grade"
        },
        {
          "item": "Aggregate base",
          "spec_claimed": "Crushed, 4in",
          "spec_delivered": "Crushed, 4in",
          "note": "Matches"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Milestone 1 paid",
          "note": ""
        },
        {
          "label": "Milestone 2 paid",
          "note": "Binder delivery logged - grade mismatch not yet reviewed"
        }
      ]
    },
    {
      "id": "WA-TAC-0004",
      "city": "Tacoma",
      "state": "WA",
      "category": "Medical Research",
      "title": "South Sound Diabetes Outcomes Study",
      "company": "Northwest Medical Labs",
      "aedis_id": "AEDIS-WA-1007",
      "budget": 980000,
      "status": "active",
      "claimed_pct": 40,
      "verified_pct": 39,
      "summary": "18-month outcomes study. Enrollment and milestones independently verified.",
      "payments": [
        {
          "label": "Enrollment milestone",
          "amount": 300000,
          "note": "412 participants verified by IRB"
        }
      ],
      "materials": [
        {
          "item": "Lab assays",
          "spec_claimed": "HbA1c panel",
          "spec_delivered": "HbA1c panel",
          "note": "Vendor invoices match"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": "Research-entity credential verified"
        },
        {
          "label": "Enrollment hit",
          "note": "On plan"
        }
      ]
    },
    {
      "id": "WA-TAC-0005",
      "city": "Tacoma",
      "state": "WA",
      "category": "Housing",
      "title": "Hilltop Affordable Housing - Phase 2",
      "company": "Evergreen General Contractors",
      "aedis_id": "AEDIS-WA-1005",
      "budget": 7400000,
      "status": "flagged",
      "flag_severity": "serious",
      "flag_reason": "Claimed 80% complete; site inspection verified 41%. Payments drawn against unverified progress. Payment hold placed pending investigation.",
      "claimed_pct": 80,
      "verified_pct": 41,
      "summary": "Contractor claimed 80% complete; site inspection verified 41%. Payments drawn against unverified progress. FLAGGED for review.",
      "payments": [
        {
          "label": "Draw 1",
          "amount": 2000000,
          "note": "Verified"
        },
        {
          "label": "Draw 2",
          "amount": 2200000,
          "note": "Verified"
        },
        {
          "label": "Draw 3",
          "amount": 1800000,
          "note": "Drawn against 80% claim - inspection found 41%"
        }
      ],
      "materials": [
        {
          "item": "Framing lumber",
          "spec_claimed": "Delivered for 60 units",
          "spec_delivered": "On site for 31 units",
          "note": "Shortfall"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Draw 3 requested",
          "note": "Triggered inspection"
        },
        {
          "label": "FLAGGED",
          "note": "Claim/verification gap exceeded threshold"
        }
      ]
    },
    {
      "id": "OR-PDX-0006",
      "city": "Portland",
      "state": "OR",
      "category": "Power Grid",
      "title": "Eastside Substation Upgrade",
      "company": "Willamette Power Co.",
      "aedis_id": "AEDIS-OR-2001",
      "budget": 5300000,
      "status": "active",
      "claimed_pct": 55,
      "verified_pct": 55,
      "summary": "Substation capacity upgrade. Claims and verification in lockstep.",
      "payments": [
        {
          "label": "Equipment delivery",
          "amount": 2400000,
          "note": "Transformers verified on site"
        }
      ],
      "materials": [
        {
          "item": "Power transformer",
          "spec_claimed": "115kV/12.47kV",
          "spec_delivered": "115kV/12.47kV",
          "note": "Serial numbers logged"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Equipment on site",
          "note": ""
        }
      ]
    },
    {
      "id": "OR-PDX-0007",
      "city": "Portland",
      "state": "OR",
      "category": "Medical Research",
      "title": "Pediatric Asthma Care Program",
      "company": "Rosewood Care Network",
      "aedis_id": "AEDIS-OR-4408",
      "budget": 3100000,
      "status": "active",
      "claimed_pct": 50,
      "verified_pct": 47,
      "summary": "Community care program. A reporting lag put verified slightly behind claimed; reconciled next cycle. (Looks 'off,' is innocent.)",
      "payments": [
        {
          "label": "Quarter 1",
          "amount": 800000,
          "note": "Caseload verified"
        },
        {
          "label": "Quarter 2",
          "amount": 750000,
          "note": "Verification pending data sync"
        }
      ],
      "materials": [
        {
          "item": "Inhaler/spacer kits",
          "spec_claimed": "1,200 kits",
          "spec_delivered": "1,180 kits",
          "note": "20 backordered, reconciled"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Q2 reporting lag",
          "note": "Data sync scheduled - not a discrepancy"
        }
      ]
    },
    {
      "id": "OR-PDX-0008",
      "city": "Portland",
      "state": "OR",
      "category": "Medical Research",
      "title": "Youth Wellness & Meals Program",
      "company": "Brightpath Youth Services",
      "aedis_id": "AEDIS-OR-4471",
      "budget": 4900000,
      "status": "active",
      "claimed_pct": 65,
      "verified_pct": 60,
      "summary": "Meals and after-school care, reportedly serving hundreds of kids. Progress looks ordinary; payments on schedule.",
      "payments": [
        {
          "label": "Month 1-2",
          "amount": 1300000,
          "note": "Approved on roster submission"
        },
        {
          "label": "Month 3-4",
          "amount": 1300000,
          "note": "Approved on roster submission"
        }
      ],
      "materials": [
        {
          "item": "Enrolled children (claimed)",
          "spec_claimed": "640 enrolled",
          "spec_delivered": "108 independently verified",
          "note": "Roster names submitted; third-party headcount far lower"
        },
        {
          "item": "Meals served (billed)",
          "spec_claimed": "38,400 meals",
          "spec_delivered": "Invoiced; delivery receipts cover ~6,500",
          "note": "Receipts on file cover a fraction of billed meals"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": "Provider credential on file"
        },
        {
          "label": "Rosters submitted",
          "note": "Self-reported enrollment"
        },
        {
          "label": "Payments approved",
          "note": "Approved against roster, not headcount"
        }
      ]
    },
    {
      "id": "ID-BOI-0009",
      "city": "Boise",
      "state": "ID",
      "category": "Road Construction",
      "title": "Front St Bridge Joint Repair",
      "company": "High Desert Civil",
      "aedis_id": "AEDIS-ID-5501",
      "budget": 720000,
      "status": "completed",
      "claimed_pct": 100,
      "verified_pct": 100,
      "summary": "Expansion-joint replacement. Completed and verified.",
      "payments": [
        {
          "label": "Completion",
          "amount": 715000,
          "note": "Verified"
        }
      ],
      "materials": [
        {
          "item": "Modular joint",
          "spec_claimed": "Steel, 4in movement",
          "spec_delivered": "Steel, 4in movement",
          "note": "Matches"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Completed",
          "note": "Inspection passed"
        }
      ]
    },
    {
      "id": "ID-BOI-0010",
      "city": "Boise",
      "state": "ID",
      "category": "Road Construction",
      "title": "Cole Rd Widening",
      "company": "Canyon Roadworks LLC",
      "aedis_id": "AEDIS-ID-5522",
      "budget": 3300000,
      "status": "flagged",
      "flag_severity": "serious",
      "flag_reason": "Base course poured without the required compaction testing on several lifts to save time; caught on inspection. Work order halted for re-testing.",
      "claimed_pct": 70,
      "verified_pct": 68,
      "summary": "Crew poured base course without the required compaction testing to save time. Caught on inspection. FLAGGED.",
      "payments": [
        {
          "label": "Milestone 1",
          "amount": 1500000,
          "note": "Approved"
        }
      ],
      "materials": [
        {
          "item": "Compaction testing",
          "spec_claimed": "Per spec, every lift",
          "spec_delivered": "Skipped on 3 of 7 lifts",
          "note": "Regulation bypass"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "FLAGGED",
          "note": "Missing required compaction tests"
        }
      ]
    },
    {
      "id": "WA-SPO-0011",
      "city": "Spokane",
      "state": "WA",
      "category": "Clinic Construction",
      "title": "North Spokane Urgent Care",
      "company": "Columbia Infrastructure Group",
      "aedis_id": "AEDIS-WA-1008",
      "budget": 2800000,
      "status": "active",
      "claimed_pct": 30,
      "verified_pct": 30,
      "summary": "Urgent care build, early stage, tracking clean.",
      "payments": [
        {
          "label": "Mobilization",
          "amount": 400000,
          "note": "Verified"
        }
      ],
      "materials": [
        {
          "item": "Sitework",
          "spec_claimed": "Per plan",
          "spec_delivered": "Per plan",
          "note": "Matches"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        }
      ]
    },
    {
      "id": "OR-EUG-0012",
      "city": "Eugene",
      "state": "OR",
      "category": "Power Grid",
      "title": "Solar Microgrid - Civic Center",
      "company": "Cascade Grid Solutions",
      "aedis_id": "AEDIS-WA-1001",
      "budget": 1600000,
      "status": "active",
      "claimed_pct": 45,
      "verified_pct": 44,
      "summary": "Rooftop + storage microgrid. Clean.",
      "payments": [
        {
          "label": "Panels delivered",
          "amount": 600000,
          "note": "Verified"
        }
      ],
      "materials": [
        {
          "item": "PV modules",
          "spec_claimed": "450W mono",
          "spec_delivered": "450W mono",
          "note": "Matches"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        }
      ]
    },
    {
      "id": "ID-IDF-0013",
      "city": "Idaho Falls",
      "state": "ID",
      "category": "Housing",
      "title": "Veterans Transitional Housing",
      "company": "High Desert Civil",
      "aedis_id": "AEDIS-ID-5501",
      "budget": 5100000,
      "status": "active",
      "claimed_pct": 52,
      "verified_pct": 51,
      "summary": "24-unit transitional housing. Tracking clean.",
      "payments": [
        {
          "label": "Foundation + framing",
          "amount": 2600000,
          "note": "Verified"
        }
      ],
      "materials": [
        {
          "item": "Framing",
          "spec_claimed": "For 24 units",
          "spec_delivered": "For 24 units",
          "note": "Matches"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Framing verified",
          "note": ""
        }
      ]
    },
    {
      "id": "WA-SEA-0014",
      "city": "Seattle",
      "state": "WA",
      "category": "Medical Research",
      "title": "Harborview Trauma Data Initiative",
      "company": "Olympia BioResearch Institute",
      "aedis_id": "AEDIS-WA-1004",
      "budget": 1250000,
      "status": "completed",
      "claimed_pct": 100,
      "verified_pct": 100,
      "summary": "Completed research initiative, fully verified.",
      "payments": [
        {
          "label": "Final",
          "amount": 1250000,
          "note": "Verified"
        }
      ],
      "materials": [
        {
          "item": "Data systems",
          "spec_claimed": "Per scope",
          "spec_delivered": "Per scope",
          "note": "Matches"
        }
      ],
      "timeline": [
        {
          "label": "Awarded",
          "note": ""
        },
        {
          "label": "Completed",
          "note": "Peer-reviewed output delivered"
        }
      ]
    }
  ],
  "countries": [
    {
      "code": "IN",
      "name": "India",
      "projects": 1342,
      "flagged": 27,
      "funds": 26643771394,
      "built": true
    },
    {
      "code": "CN",
      "name": "China",
      "projects": 890,
      "flagged": 10,
      "funds": 22121811668,
      "built": true
    },
    {
      "code": "NG",
      "name": "Nigeria",
      "projects": 326,
      "flagged": 6,
      "funds": 5889083370,
      "built": true
    },
    {
      "code": "PK",
      "name": "Pakistan",
      "projects": 305,
      "flagged": 7,
      "funds": 6203086811,
      "built": true
    },
    {
      "code": "ID",
      "name": "Indonesia",
      "projects": 299,
      "flagged": 6,
      "funds": 6981549980,
      "built": true
    },
    {
      "code": "BD",
      "name": "Bangladesh",
      "projects": 255,
      "flagged": 5,
      "funds": 4838036938,
      "built": true
    },
    {
      "code": "ET",
      "name": "Ethiopia",
      "projects": 225,
      "flagged": 5,
      "funds": 3603978622,
      "built": true
    },
    {
      "code": "BR",
      "name": "Brazil",
      "projects": 213,
      "flagged": 3,
      "funds": 4676788353,
      "built": true
    },
    {
      "code": "CD",
      "name": "DR Congo",
      "projects": 207,
      "flagged": 6,
      "funds": 2920332149,
      "built": true
    },
    {
      "code": "EG",
      "name": "Egypt",
      "projects": 159,
      "flagged": 2,
      "funds": 3308663060,
      "built": true
    },
    {
      "code": "PH",
      "name": "Philippines",
      "projects": 159,
      "flagged": 2,
      "funds": 2997528419,
      "built": true
    },
    {
      "code": "US",
      "name": "United States",
      "projects": 152,
      "flagged": 1,
      "funds": 4753869997,
      "built": true
    },
    {
      "code": "VN",
      "name": "Vietnam",
      "projects": 131,
      "flagged": 2,
      "funds": 2710169215,
      "built": true
    },
    {
      "code": "MX",
      "name": "Mexico",
      "projects": 126,
      "flagged": 2,
      "funds": 3150293421,
      "built": true
    },
    {
      "code": "TZ",
      "name": "Tanzania",
      "projects": 123,
      "flagged": 2,
      "funds": 1903773933,
      "built": true
    },
    {
      "code": "RU",
      "name": "Russia",
      "projects": 114,
      "flagged": 1,
      "funds": 2963437432,
      "built": true
    },
    {
      "code": "IR",
      "name": "Iran",
      "projects": 110,
      "flagged": 2,
      "funds": 2363927517,
      "built": true
    },
    {
      "code": "SD",
      "name": "Sudan",
      "projects": 107,
      "flagged": 2,
      "funds": 1396148276,
      "built": true
    },
    {
      "code": "KE",
      "name": "Kenya",
      "projects": 106,
      "flagged": 2,
      "funds": 1680787289,
      "built": true
    },
    {
      "code": "AF",
      "name": "Afghanistan",
      "projects": 104,
      "flagged": 2,
      "funds": 1437086083,
      "built": true
    },
    {
      "code": "MM",
      "name": "Myanmar",
      "projects": 97,
      "flagged": 1,
      "funds": 1712675403,
      "built": true
    },
    {
      "code": "ZA",
      "name": "South Africa",
      "projects": 93,
      "flagged": 1,
      "funds": 1943946730,
      "built": true
    },
    {
      "code": "UG",
      "name": "Uganda",
      "projects": 93,
      "flagged": 2,
      "funds": 1415082035,
      "built": true
    },
    {
      "code": "TR",
      "name": "Turkey",
      "projects": 89,
      "flagged": 1,
      "funds": 2358869642,
      "built": true
    },
    {
      "code": "TH",
      "name": "Thailand",
      "projects": 84,
      "flagged": 1,
      "funds": 1772950639,
      "built": true
    },
    {
      "code": "IQ",
      "name": "Iraq",
      "projects": 82,
      "flagged": 1,
      "funds": 1720278993,
      "built": true
    },
    {
      "code": "MZ",
      "name": "Mozambique",
      "projects": 80,
      "flagged": 2,
      "funds": 1215664575,
      "built": true
    },
    {
      "code": "YE",
      "name": "Yemen",
      "projects": 80,
      "flagged": 2,
      "funds": 1080638573,
      "built": true
    },
    {
      "code": "AO",
      "name": "Angola",
      "projects": 77,
      "flagged": 1,
      "funds": 1223438291,
      "built": true
    },
    {
      "code": "CO",
      "name": "Colombia",
      "projects": 77,
      "flagged": 1,
      "funds": 1799175587,
      "built": true
    },
    {
      "code": "NE",
      "name": "Niger",
      "projects": 75,
      "flagged": 2,
      "funds": 1066059804,
      "built": true
    },
    {
      "code": "MG",
      "name": "Madagascar",
      "projects": 72,
      "flagged": 1,
      "funds": 1001707820,
      "built": true
    },
    {
      "code": "DZ",
      "name": "Algeria",
      "projects": 71,
      "flagged": 1,
      "funds": 1514780678,
      "built": true
    },
    {
      "code": "CM",
      "name": "Cameroon",
      "projects": 71,
      "flagged": 1,
      "funds": 1235222691,
      "built": true
    },
    {
      "code": "GH",
      "name": "Ghana",
      "projects": 71,
      "flagged": 1,
      "funds": 1215752376,
      "built": true
    },
    {
      "code": "NP",
      "name": "Nepal",
      "projects": 69,
      "flagged": 1,
      "funds": 1146907568,
      "built": true
    },
    {
      "code": "KP",
      "name": "North Korea",
      "projects": 66,
      "flagged": 1,
      "funds": 989715002,
      "built": true
    },
    {
      "code": "UA",
      "name": "Ukraine",
      "projects": 66,
      "flagged": 1,
      "funds": 1445927803,
      "built": true
    },
    {
      "code": "MA",
      "name": "Morocco",
      "projects": 64,
      "flagged": 1,
      "funds": 1284727262,
      "built": true
    },
    {
      "code": "AR",
      "name": "Argentina",
      "projects": 63,
      "flagged": 0,
      "funds": 1600577870,
      "built": true
    },
    {
      "code": "CI",
      "name": "Côte d'Ivoire",
      "projects": 63,
      "flagged": 1,
      "funds": 1137384066,
      "built": true
    },
    {
      "code": "JP",
      "name": "Japan",
      "projects": 63,
      "flagged": 0,
      "funds": 1779933714,
      "built": true
    },
    {
      "code": "ML",
      "name": "Mali",
      "projects": 63,
      "flagged": 1,
      "funds": 888274323,
      "built": true
    },
    {
      "code": "SO",
      "name": "Somalia",
      "projects": 63,
      "flagged": 2,
      "funds": 827913909,
      "built": true
    },
    {
      "code": "BF",
      "name": "Burkina Faso",
      "projects": 62,
      "flagged": 1,
      "funds": 903682090,
      "built": true
    },
    {
      "code": "TD",
      "name": "Chad",
      "projects": 61,
      "flagged": 1,
      "funds": 733236022,
      "built": true
    },
    {
      "code": "PE",
      "name": "Peru",
      "projects": 61,
      "flagged": 1,
      "funds": 1267330091,
      "built": true
    },
    {
      "code": "UZ",
      "name": "Uzbekistan",
      "projects": 61,
      "flagged": 1,
      "funds": 1348515579,
      "built": true
    },
    {
      "code": "MW",
      "name": "Malawi",
      "projects": 59,
      "flagged": 1,
      "funds": 866869915,
      "built": true
    },
    {
      "code": "SY",
      "name": "Syria",
      "projects": 59,
      "flagged": 1,
      "funds": 824805886,
      "built": true
    },
    {
      "code": "VE",
      "name": "Venezuela",
      "projects": 58,
      "flagged": 1,
      "funds": 1182033210,
      "built": true
    },
    {
      "code": "ZM",
      "name": "Zambia",
      "projects": 57,
      "flagged": 1,
      "funds": 853567477,
      "built": true
    },
    {
      "code": "MY",
      "name": "Malaysia",
      "projects": 54,
      "flagged": 0,
      "funds": 1287816682,
      "built": true
    },
    {
      "code": "SN",
      "name": "Senegal",
      "projects": 53,
      "flagged": 1,
      "funds": 891149672,
      "built": true
    },
    {
      "code": "BI",
      "name": "Burundi",
      "projects": 51,
      "flagged": 1,
      "funds": 736184887,
      "built": true
    },
    {
      "code": "GT",
      "name": "Guatemala",
      "projects": 50,
      "flagged": 1,
      "funds": 966122605,
      "built": true
    },
    {
      "code": "ZW",
      "name": "Zimbabwe",
      "projects": 50,
      "flagged": 1,
      "funds": 828326387,
      "built": true
    },
    {
      "code": "DE",
      "name": "Germany",
      "projects": 49,
      "flagged": 0,
      "funds": 1558246928,
      "built": true
    },
    {
      "code": "GN",
      "name": "Guinea",
      "projects": 49,
      "flagged": 1,
      "funds": 664170635,
      "built": true
    },
    {
      "code": "RW",
      "name": "Rwanda",
      "projects": 49,
      "flagged": 1,
      "funds": 859285523,
      "built": true
    },
    {
      "code": "SA",
      "name": "Saudi Arabia",
      "projects": 49,
      "flagged": 0,
      "funds": 1260045727,
      "built": true
    },
    {
      "code": "BJ",
      "name": "Benin",
      "projects": 48,
      "flagged": 1,
      "funds": 815657099,
      "built": true
    },
    {
      "code": "HT",
      "name": "Haiti",
      "projects": 48,
      "flagged": 1,
      "funds": 639632599,
      "built": true
    },
    {
      "code": "SS",
      "name": "South Sudan",
      "projects": 48,
      "flagged": 1,
      "funds": 542170855,
      "built": true
    },
    {
      "code": "KH",
      "name": "Cambodia",
      "projects": 47,
      "flagged": 0,
      "funds": 871982006,
      "built": true
    },
    {
      "code": "EC",
      "name": "Ecuador",
      "projects": 47,
      "flagged": 0,
      "funds": 1073974484,
      "built": true
    },
    {
      "code": "IT",
      "name": "Italy",
      "projects": 47,
      "flagged": 0,
      "funds": 1545883594,
      "built": true
    },
    {
      "code": "LK",
      "name": "Sri Lanka",
      "projects": 47,
      "flagged": 0,
      "funds": 1054542734,
      "built": true
    },
    {
      "code": "GB",
      "name": "United Kingdom",
      "projects": 47,
      "flagged": 0,
      "funds": 1305874789,
      "built": true
    },
    {
      "code": "KR",
      "name": "South Korea",
      "projects": 46,
      "flagged": 0,
      "funds": 1454838453,
      "built": true
    },
    {
      "code": "PL",
      "name": "Poland",
      "projects": 45,
      "flagged": 0,
      "funds": 1262014143,
      "built": true
    },
    {
      "code": "ES",
      "name": "Spain",
      "projects": 45,
      "flagged": 0,
      "funds": 1336246547,
      "built": true
    },
    {
      "code": "FR",
      "name": "France",
      "projects": 44,
      "flagged": 0,
      "funds": 1440121985,
      "built": true
    },
    {
      "code": "PG",
      "name": "Papua New Guinea",
      "projects": 44,
      "flagged": 0,
      "funds": 793641463,
      "built": true
    },
    {
      "code": "BO",
      "name": "Bolivia",
      "projects": 43,
      "flagged": 0,
      "funds": 797082351,
      "built": true
    },
    {
      "code": "SL",
      "name": "Sierra Leone",
      "projects": 43,
      "flagged": 1,
      "funds": 558247695,
      "built": true
    },
    {
      "code": "CL",
      "name": "Chile",
      "projects": 42,
      "flagged": 0,
      "funds": 1169403646,
      "built": true
    },
    {
      "code": "TG",
      "name": "Togo",
      "projects": 42,
      "flagged": 0,
      "funds": 661762399,
      "built": true
    },
    {
      "code": "KZ",
      "name": "Kazakhstan",
      "projects": 41,
      "flagged": 0,
      "funds": 1088689014,
      "built": true
    },
    {
      "code": "HN",
      "name": "Honduras",
      "projects": 40,
      "flagged": 0,
      "funds": 849471061,
      "built": true
    },
    {
      "code": "TJ",
      "name": "Tajikistan",
      "projects": 40,
      "flagged": 0,
      "funds": 816050933,
      "built": true
    },
    {
      "code": "TN",
      "name": "Tunisia",
      "projects": 40,
      "flagged": 0,
      "funds": 925725993,
      "built": true
    },
    {
      "code": "CA",
      "name": "Canada",
      "projects": 39,
      "flagged": 0,
      "funds": 1144869603,
      "built": true
    },
    {
      "code": "DO",
      "name": "Dominican Republic",
      "projects": 39,
      "flagged": 0,
      "funds": 873993438,
      "built": true
    },
    {
      "code": "JO",
      "name": "Jordan",
      "projects": 39,
      "flagged": 0,
      "funds": 878161265,
      "built": true
    },
    {
      "code": "RO",
      "name": "Romania",
      "projects": 39,
      "flagged": 0,
      "funds": 1167726180,
      "built": true
    },
    {
      "code": "CF",
      "name": "Central African Republic",
      "projects": 38,
      "flagged": 1,
      "funds": 486899277,
      "built": true
    },
    {
      "code": "LA",
      "name": "Laos",
      "projects": 38,
      "flagged": 0,
      "funds": 748769439,
      "built": true
    },
    {
      "code": "CG",
      "name": "Republic of the Congo",
      "projects": 38,
      "flagged": 0,
      "funds": 614504149,
      "built": true
    },
    {
      "code": "CU",
      "name": "Cuba",
      "projects": 37,
      "flagged": 0,
      "funds": 947911482,
      "built": true
    },
    {
      "code": "LR",
      "name": "Liberia",
      "projects": 37,
      "flagged": 0,
      "funds": 528749813,
      "built": true
    },
    {
      "code": "LY",
      "name": "Libya",
      "projects": 37,
      "flagged": 0,
      "funds": 821614720,
      "built": true
    },
    {
      "code": "NI",
      "name": "Nicaragua",
      "projects": 37,
      "flagged": 0,
      "funds": 778284823,
      "built": true
    },
    {
      "code": "AU",
      "name": "Australia",
      "projects": 36,
      "flagged": 0,
      "funds": 1032616676,
      "built": true
    },
    {
      "code": "AZ",
      "name": "Azerbaijan",
      "projects": 36,
      "flagged": 0,
      "funds": 831127752,
      "built": true
    },
    {
      "code": "KG",
      "name": "Kyrgyzstan",
      "projects": 36,
      "flagged": 0,
      "funds": 855222286,
      "built": true
    },
    {
      "code": "MR",
      "name": "Mauritania",
      "projects": 36,
      "flagged": 0,
      "funds": 609546884,
      "built": true
    },
    {
      "code": "TM",
      "name": "Turkmenistan",
      "projects": 36,
      "flagged": 0,
      "funds": 747072904,
      "built": true
    },
    {
      "code": "SV",
      "name": "El Salvador",
      "projects": 35,
      "flagged": 0,
      "funds": 729007450,
      "built": true
    },
    {
      "code": "ER",
      "name": "Eritrea",
      "projects": 35,
      "flagged": 1,
      "funds": 517051391,
      "built": true
    },
    {
      "code": "LB",
      "name": "Lebanon",
      "projects": 35,
      "flagged": 0,
      "funds": 699328866,
      "built": true
    },
    {
      "code": "PY",
      "name": "Paraguay",
      "projects": 35,
      "flagged": 0,
      "funds": 783333554,
      "built": true
    },
    {
      "code": "TW",
      "name": "Taiwan",
      "projects": 35,
      "flagged": 0,
      "funds": 1069911486,
      "built": true
    },
    {
      "code": "BY",
      "name": "Belarus",
      "projects": 33,
      "flagged": 0,
      "funds": 932646599,
      "built": true
    },
    {
      "code": "GM",
      "name": "Gambia",
      "projects": 33,
      "flagged": 0,
      "funds": 512172748,
      "built": true
    },
    {
      "code": "GR",
      "name": "Greece",
      "projects": 33,
      "flagged": 0,
      "funds": 1060323762,
      "built": true
    },
    {
      "code": "GW",
      "name": "Guinea-Bissau",
      "projects": 33,
      "flagged": 0,
      "funds": 442911792,
      "built": true
    },
    {
      "code": "HU",
      "name": "Hungary",
      "projects": 33,
      "flagged": 0,
      "funds": 953905113,
      "built": true
    },
    {
      "code": "NL",
      "name": "Netherlands",
      "projects": 33,
      "flagged": 0,
      "funds": 1072741621,
      "built": true
    },
    {
      "code": "PT",
      "name": "Portugal",
      "projects": 33,
      "flagged": 0,
      "funds": 1056978384,
      "built": true
    },
    {
      "code": "RS",
      "name": "Serbia",
      "projects": 33,
      "flagged": 0,
      "funds": 982824959,
      "built": true
    },
    {
      "code": "BE",
      "name": "Belgium",
      "projects": 32,
      "flagged": 0,
      "funds": 998066737,
      "built": true
    },
    {
      "code": "BW",
      "name": "Botswana",
      "projects": 32,
      "flagged": 0,
      "funds": 662741490,
      "built": true
    },
    {
      "code": "BG",
      "name": "Bulgaria",
      "projects": 32,
      "flagged": 0,
      "funds": 928378392,
      "built": true
    },
    {
      "code": "CR",
      "name": "Costa Rica",
      "projects": 32,
      "flagged": 0,
      "funds": 944801182,
      "built": true
    },
    {
      "code": "CZ",
      "name": "Czechia",
      "projects": 32,
      "flagged": 0,
      "funds": 1022930084,
      "built": true
    },
    {
      "code": "GQ",
      "name": "Equatorial Guinea",
      "projects": 32,
      "flagged": 0,
      "funds": 499553895,
      "built": true
    },
    {
      "code": "GA",
      "name": "Gabon",
      "projects": 32,
      "flagged": 0,
      "funds": 659214734,
      "built": true
    },
    {
      "code": "GE",
      "name": "Georgia",
      "projects": 32,
      "flagged": 0,
      "funds": 812201944,
      "built": true
    },
    {
      "code": "IL",
      "name": "Israel",
      "projects": 32,
      "flagged": 0,
      "funds": 933027234,
      "built": true
    },
    {
      "code": "JM",
      "name": "Jamaica",
      "projects": 32,
      "flagged": 0,
      "funds": 692233804,
      "built": true
    },
    {
      "code": "LS",
      "name": "Lesotho",
      "projects": 32,
      "flagged": 0,
      "funds": 580975273,
      "built": true
    },
    {
      "code": "MD",
      "name": "Moldova",
      "projects": 32,
      "flagged": 0,
      "funds": 817266285,
      "built": true
    },
    {
      "code": "MN",
      "name": "Mongolia",
      "projects": 32,
      "flagged": 0,
      "funds": 723374720,
      "built": true
    },
    {
      "code": "NA",
      "name": "Namibia",
      "projects": 32,
      "flagged": 0,
      "funds": 691262771,
      "built": true
    },
    {
      "code": "PA",
      "name": "Panama",
      "projects": 32,
      "flagged": 0,
      "funds": 850767877,
      "built": true
    },
    {
      "code": "AE",
      "name": "United Arab Emirates",
      "projects": 32,
      "flagged": 0,
      "funds": 911888766,
      "built": true
    },
    {
      "code": "AL",
      "name": "Albania",
      "projects": 31,
      "flagged": 0,
      "funds": 783770593,
      "built": true
    },
    {
      "code": "AM",
      "name": "Armenia",
      "projects": 31,
      "flagged": 0,
      "funds": 809511693,
      "built": true
    },
    {
      "code": "AT",
      "name": "Austria",
      "projects": 31,
      "flagged": 0,
      "funds": 1002976020,
      "built": true
    },
    {
      "code": "BA",
      "name": "Bosnia and Herzegovina",
      "projects": 31,
      "flagged": 0,
      "funds": 746564952,
      "built": true
    },
    {
      "code": "KM",
      "name": "Comoros",
      "projects": 31,
      "flagged": 0,
      "funds": 467044962,
      "built": true
    },
    {
      "code": "HR",
      "name": "Croatia",
      "projects": 31,
      "flagged": 0,
      "funds": 856816545,
      "built": true
    },
    {
      "code": "DJ",
      "name": "Djibouti",
      "projects": 31,
      "flagged": 0,
      "funds": 575255019,
      "built": true
    },
    {
      "code": "SZ",
      "name": "Eswatini",
      "projects": 31,
      "flagged": 0,
      "funds": 599801031,
      "built": true
    },
    {
      "code": "KW",
      "name": "Kuwait",
      "projects": 31,
      "flagged": 0,
      "funds": 949018059,
      "built": true
    },
    {
      "code": "NZ",
      "name": "New Zealand",
      "projects": 31,
      "flagged": 0,
      "funds": 882591450,
      "built": true
    },
    {
      "code": "MK",
      "name": "North Macedonia",
      "projects": 31,
      "flagged": 0,
      "funds": 779905405,
      "built": true
    },
    {
      "code": "OM",
      "name": "Oman",
      "projects": 31,
      "flagged": 0,
      "funds": 978185879,
      "built": true
    },
    {
      "code": "SK",
      "name": "Slovakia",
      "projects": 31,
      "flagged": 0,
      "funds": 910120017,
      "built": true
    },
    {
      "code": "SE",
      "name": "Sweden",
      "projects": 31,
      "flagged": 0,
      "funds": 1036382100,
      "built": true
    },
    {
      "code": "CH",
      "name": "Switzerland",
      "projects": 31,
      "flagged": 0,
      "funds": 1029501870,
      "built": true
    },
    {
      "code": "TL",
      "name": "Timor-Leste",
      "projects": 31,
      "flagged": 0,
      "funds": 585071765,
      "built": true
    },
    {
      "code": "UY",
      "name": "Uruguay",
      "projects": 31,
      "flagged": 0,
      "funds": 908214034,
      "built": true
    },
    {
      "code": "AD",
      "name": "Andorra",
      "projects": 30,
      "flagged": 0,
      "funds": 922649623,
      "built": true
    },
    {
      "code": "AG",
      "name": "Antigua and Barbuda",
      "projects": 30,
      "flagged": 0,
      "funds": 885099440,
      "built": true
    },
    {
      "code": "BS",
      "name": "Bahamas",
      "projects": 30,
      "flagged": 0,
      "funds": 881147036,
      "built": true
    },
    {
      "code": "BH",
      "name": "Bahrain",
      "projects": 30,
      "flagged": 0,
      "funds": 993689121,
      "built": true
    },
    {
      "code": "BB",
      "name": "Barbados",
      "projects": 30,
      "flagged": 0,
      "funds": 912810451,
      "built": true
    },
    {
      "code": "BZ",
      "name": "Belize",
      "projects": 30,
      "flagged": 0,
      "funds": 699521639,
      "built": true
    },
    {
      "code": "BT",
      "name": "Bhutan",
      "projects": 30,
      "flagged": 0,
      "funds": 624395310,
      "built": true
    },
    {
      "code": "BN",
      "name": "Brunei",
      "projects": 30,
      "flagged": 0,
      "funds": 938155960,
      "built": true
    },
    {
      "code": "CV",
      "name": "Cabo Verde",
      "projects": 30,
      "flagged": 0,
      "funds": 739646780,
      "built": true
    },
    {
      "code": "CY",
      "name": "Cyprus",
      "projects": 30,
      "flagged": 0,
      "funds": 949599111,
      "built": true
    },
    {
      "code": "DK",
      "name": "Denmark",
      "projects": 30,
      "flagged": 0,
      "funds": 963906611,
      "built": true
    },
    {
      "code": "DM",
      "name": "Dominica",
      "projects": 30,
      "flagged": 0,
      "funds": 732561783,
      "built": true
    },
    {
      "code": "EE",
      "name": "Estonia",
      "projects": 30,
      "flagged": 0,
      "funds": 959533483,
      "built": true
    },
    {
      "code": "FJ",
      "name": "Fiji",
      "projects": 30,
      "flagged": 0,
      "funds": 642258016,
      "built": true
    },
    {
      "code": "FI",
      "name": "Finland",
      "projects": 30,
      "flagged": 0,
      "funds": 937039485,
      "built": true
    },
    {
      "code": "GD",
      "name": "Grenada",
      "projects": 30,
      "flagged": 0,
      "funds": 804849552,
      "built": true
    },
    {
      "code": "GY",
      "name": "Guyana",
      "projects": 30,
      "flagged": 0,
      "funds": 641733841,
      "built": true
    },
    {
      "code": "IS",
      "name": "Iceland",
      "projects": 30,
      "flagged": 0,
      "funds": 909643204,
      "built": true
    },
    {
      "code": "IE",
      "name": "Ireland",
      "projects": 30,
      "flagged": 0,
      "funds": 886793274,
      "built": true
    },
    {
      "code": "KI",
      "name": "Kiribati",
      "projects": 30,
      "flagged": 0,
      "funds": 553045802,
      "built": true
    },
    {
      "code": "LV",
      "name": "Latvia",
      "projects": 30,
      "flagged": 0,
      "funds": 890572338,
      "built": true
    },
    {
      "code": "LI",
      "name": "Liechtenstein",
      "projects": 30,
      "flagged": 0,
      "funds": 888671596,
      "built": true
    },
    {
      "code": "LT",
      "name": "Lithuania",
      "projects": 30,
      "flagged": 0,
      "funds": 910061766,
      "built": true
    },
    {
      "code": "LU",
      "name": "Luxembourg",
      "projects": 30,
      "flagged": 0,
      "funds": 955554882,
      "built": true
    },
    {
      "code": "MV",
      "name": "Maldives",
      "projects": 30,
      "flagged": 0,
      "funds": 838550078,
      "built": true
    },
    {
      "code": "MT",
      "name": "Malta",
      "projects": 30,
      "flagged": 0,
      "funds": 985923655,
      "built": true
    },
    {
      "code": "MH",
      "name": "Marshall Islands",
      "projects": 30,
      "flagged": 0,
      "funds": 588533919,
      "built": true
    },
    {
      "code": "MU",
      "name": "Mauritius",
      "projects": 30,
      "flagged": 0,
      "funds": 823026574,
      "built": true
    },
    {
      "code": "FM",
      "name": "Micronesia",
      "projects": 30,
      "flagged": 0,
      "funds": 569687001,
      "built": true
    },
    {
      "code": "MC",
      "name": "Monaco",
      "projects": 30,
      "flagged": 0,
      "funds": 927916840,
      "built": true
    },
    {
      "code": "ME",
      "name": "Montenegro",
      "projects": 30,
      "flagged": 0,
      "funds": 759232720,
      "built": true
    },
    {
      "code": "NR",
      "name": "Nauru",
      "projects": 30,
      "flagged": 0,
      "funds": 658953402,
      "built": true
    },
    {
      "code": "NO",
      "name": "Norway",
      "projects": 30,
      "flagged": 0,
      "funds": 981147109,
      "built": true
    },
    {
      "code": "PW",
      "name": "Palau",
      "projects": 30,
      "flagged": 0,
      "funds": 637842399,
      "built": true
    },
    {
      "code": "QA",
      "name": "Qatar",
      "projects": 30,
      "flagged": 0,
      "funds": 1027790347,
      "built": true
    },
    {
      "code": "KN",
      "name": "Saint Kitts and Nevis",
      "projects": 30,
      "flagged": 0,
      "funds": 872952600,
      "built": true
    },
    {
      "code": "LC",
      "name": "Saint Lucia",
      "projects": 30,
      "flagged": 0,
      "funds": 764073083,
      "built": true
    },
    {
      "code": "VC",
      "name": "Saint Vincent and the Grenadines",
      "projects": 30,
      "flagged": 0,
      "funds": 762131037,
      "built": true
    },
    {
      "code": "WS",
      "name": "Samoa",
      "projects": 30,
      "flagged": 0,
      "funds": 705882335,
      "built": true
    },
    {
      "code": "SM",
      "name": "San Marino",
      "projects": 30,
      "flagged": 0,
      "funds": 1058081857,
      "built": true
    },
    {
      "code": "ST",
      "name": "Sao Tome and Principe",
      "projects": 30,
      "flagged": 0,
      "funds": 559566177,
      "built": true
    },
    {
      "code": "SC",
      "name": "Seychelles",
      "projects": 30,
      "flagged": 0,
      "funds": 888075685,
      "built": true
    },
    {
      "code": "SG",
      "name": "Singapore",
      "projects": 30,
      "flagged": 0,
      "funds": 1002139356,
      "built": true
    },
    {
      "code": "SI",
      "name": "Slovenia",
      "projects": 30,
      "flagged": 0,
      "funds": 999222396,
      "built": true
    },
    {
      "code": "SB",
      "name": "Solomon Islands",
      "projects": 30,
      "flagged": 0,
      "funds": 512746500,
      "built": true
    },
    {
      "code": "SR",
      "name": "Suriname",
      "projects": 30,
      "flagged": 0,
      "funds": 683146108,
      "built": true
    },
    {
      "code": "TO",
      "name": "Tonga",
      "projects": 30,
      "flagged": 0,
      "funds": 672786749,
      "built": true
    },
    {
      "code": "TT",
      "name": "Trinidad and Tobago",
      "projects": 30,
      "flagged": 0,
      "funds": 806417095,
      "built": true
    },
    {
      "code": "TV",
      "name": "Tuvalu",
      "projects": 30,
      "flagged": 0,
      "funds": 607043555,
      "built": true
    },
    {
      "code": "VU",
      "name": "Vanuatu",
      "projects": 30,
      "flagged": 0,
      "funds": 572188583,
      "built": true
    },
    {
      "code": "VA",
      "name": "Vatican City",
      "projects": 30,
      "flagged": 0,
      "funds": 966904145,
      "built": true
    }
  ],
  "countryTotals": {
    "countries": 195,
    "projects": 12717,
    "flagged": 142,
    "funds": 275920658847
  },
  "reserves": [
    {
      "code": "US",
      "name": "United States",
      "central_bank": "Federal Reserve",
      "population": 335000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 12
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 46
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 28
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 18
        }
      ],
      "allocation": {
        "needs_index": 26.9,
        "base_allocation": 162207000000,
        "absorption_ceiling": 149230440000,
        "credit_line": 149230440000,
        "drawn": 61184480400,
        "remaining": 88045959600,
        "utilization_pct": 41.0,
        "inflation_risk": 41.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "CN",
      "name": "China",
      "central_bank": "People's Bank of China",
      "population": 1410000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 24
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 38
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 30
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 22
        }
      ],
      "allocation": {
        "needs_index": 29.1,
        "base_allocation": 738558000000,
        "absorption_ceiling": 649931040000,
        "credit_line": 649931040000,
        "drawn": 233975174400,
        "remaining": 415955865600,
        "utilization_pct": 36.0,
        "inflation_risk": 36.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "IN",
      "name": "India",
      "central_bank": "Reserve Bank of India",
      "population": 1430000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 44
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 52
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 49
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 41
        }
      ],
      "allocation": {
        "needs_index": 46.9,
        "base_allocation": 1207206000000,
        "absorption_ceiling": 748467720000,
        "credit_line": 748467720000,
        "drawn": 217055638800,
        "remaining": 531412081200,
        "utilization_pct": 29.0,
        "inflation_risk": 29.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "NG",
      "name": "Nigeria",
      "central_bank": "Central Bank of Nigeria",
      "population": 224000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 64
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 68
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 60
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 55
        }
      ],
      "allocation": {
        "needs_index": 62.5,
        "base_allocation": 252000000000,
        "absorption_ceiling": 120960000000,
        "credit_line": 120960000000,
        "drawn": 22982400000,
        "remaining": 97977600000,
        "utilization_pct": 19.0,
        "inflation_risk": 19.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "DE",
      "name": "Germany",
      "central_bank": "Deutsche Bundesbank",
      "population": 84000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 8
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 22
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 19
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 9
        }
      ],
      "allocation": {
        "needs_index": 14.8,
        "base_allocation": 22377600000,
        "absorption_ceiling": 21034944000,
        "credit_line": 21034944000,
        "drawn": 6941531520,
        "remaining": 14093412480,
        "utilization_pct": 33.0,
        "inflation_risk": 33.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "BR",
      "name": "Brazil",
      "central_bank": "Central Bank of Brazil",
      "population": 216000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 44
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 48
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 40
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 36
        }
      ],
      "allocation": {
        "needs_index": 42.7,
        "base_allocation": 166017600000,
        "absorption_ceiling": 116212320000,
        "credit_line": 116212320000,
        "drawn": 34863696000,
        "remaining": 81348624000,
        "utilization_pct": 30.0,
        "inflation_risk": 30.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "ID",
      "name": "Indonesia",
      "central_bank": "Bank Indonesia",
      "population": 278000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 46
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 50
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 42
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 38
        }
      ],
      "allocation": {
        "needs_index": 44.7,
        "base_allocation": 223678800000,
        "absorption_ceiling": 154338372000,
        "credit_line": 154338372000,
        "drawn": 46301511600,
        "remaining": 108036860400,
        "utilization_pct": 30.0,
        "inflation_risk": 30.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "JP",
      "name": "Japan",
      "central_bank": "Bank of Japan",
      "population": 123000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 16
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 20
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 12
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 8
        }
      ],
      "allocation": {
        "needs_index": 14.7,
        "base_allocation": 32545800000,
        "absorption_ceiling": 29616678000,
        "credit_line": 29616678000,
        "drawn": 8885003400,
        "remaining": 20731674600,
        "utilization_pct": 30.0,
        "inflation_risk": 30.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "MX",
      "name": "Mexico",
      "central_bank": "Bank of Mexico",
      "population": 128000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 42
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 46
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 38
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 34
        }
      ],
      "allocation": {
        "needs_index": 40.7,
        "base_allocation": 93772800000,
        "absorption_ceiling": 66578688000,
        "credit_line": 66578688000,
        "drawn": 19973606400,
        "remaining": 46605081600,
        "utilization_pct": 30.0,
        "inflation_risk": 30.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "ZA",
      "name": "South Africa",
      "central_bank": "South African Reserve Bank",
      "population": 60000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 51
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 55
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 47
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 43
        }
      ],
      "allocation": {
        "needs_index": 49.7,
        "base_allocation": 53676000000,
        "absorption_ceiling": 34889400000,
        "credit_line": 34889400000,
        "drawn": 10466820000,
        "remaining": 24422580000,
        "utilization_pct": 30.0,
        "inflation_risk": 30.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "GB",
      "name": "United Kingdom",
      "central_bank": "Bank of England",
      "population": 68000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 16
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 20
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 12
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 8
        }
      ],
      "allocation": {
        "needs_index": 14.7,
        "base_allocation": 17992800000,
        "absorption_ceiling": 16373448000,
        "credit_line": 16373448000,
        "drawn": 4912034400,
        "remaining": 11461413600,
        "utilization_pct": 30.0,
        "inflation_risk": 30.0,
        "ceiling_binds": true
      }
    },
    {
      "code": "FR",
      "name": "France",
      "central_bank": "Banque de France",
      "population": 65000000,
      "indicators": [
        {
          "key": "water",
          "label": "Water & Sanitation",
          "source": "WHO/UNICEF Joint Monitoring Programme",
          "metric": "% without safely managed drinking water",
          "weight": 0.28,
          "deficit": 15
        },
        {
          "key": "health",
          "label": "Health Access",
          "source": "WHO Global Health Observatory",
          "metric": "Out-of-pocket cost burden + infant mortality",
          "weight": 0.3,
          "deficit": 19
        },
        {
          "key": "housing",
          "label": "Housing Adequacy",
          "source": "UN-Habitat",
          "metric": "% in inadequate or informal housing",
          "weight": 0.22,
          "deficit": 11
        },
        {
          "key": "food",
          "label": "Food Security",
          "source": "FAO State of Food Security",
          "metric": "Prevalence of undernourishment",
          "weight": 0.2,
          "deficit": 7
        }
      ],
      "allocation": {
        "needs_index": 13.7,
        "base_allocation": 16029000000,
        "absorption_ceiling": 14746680000,
        "credit_line": 14746680000,
        "drawn": 4424004000,
        "remaining": 10322676000,
        "utilization_pct": 30.0,
        "inflation_risk": 30.0,
        "ceiling_binds": true
      }
    }
  ],
  "phaseZero": {
    "oracle": [
      {
        "commodity": "Copper",
        "symbol": "Cu",
        "use": "Electrical wiring, grid infrastructure, motors",
        "status": "MODERATE",
        "note": "Elevated prices — authorization velocity reduced 15% for grid projects",
        "color": "amber"
      },
      {
        "commodity": "Lithium",
        "symbol": "Li",
        "use": "Battery storage, grid stabilization, EVs",
        "status": "ELEVATED",
        "note": "High demand vs. supply — authorization velocity reduced 30% for storage projects",
        "color": "red"
      },
      {
        "commodity": "Steel",
        "symbol": "Fe",
        "use": "Structural construction, water systems, manufacturing",
        "status": "OK",
        "note": "Supply adequate — full authorization velocity",
        "color": "teal"
      },
      {
        "commodity": "Cement",
        "symbol": "CaSiO",
        "use": "Roads, buildings, foundations, water infrastructure",
        "status": "OK",
        "note": "Supply adequate — full authorization velocity",
        "color": "teal"
      },
      {
        "commodity": "Rare Earth Elements",
        "symbol": "REE",
        "use": "AI hardware, motors, sensors, clean energy systems",
        "status": "ELEVATED",
        "note": "Concentrated supply — diversification credits prioritized",
        "color": "red"
      },
      {
        "commodity": "Silicon",
        "symbol": "Si",
        "use": "Solar panels, semiconductors, data infrastructure",
        "status": "MODERATE",
        "note": "Capacity expanding — velocity at 80%",
        "color": "amber"
      },
      {
        "commodity": "Cobalt",
        "symbol": "Co",
        "use": "Battery chemistry, aerospace alloys",
        "status": "RESTRICTED",
        "note": "Critical shortage — SIC Sink engaged; alternative chemistry R&D prioritized",
        "color": "red"
      },
      {
        "commodity": "Aluminum",
        "symbol": "Al",
        "use": "Construction, grid hardware, transportation",
        "status": "OK",
        "note": "Supply adequate — full authorization velocity",
        "color": "teal"
      },
      {
        "commodity": "Phosphate",
        "symbol": "PO₄",
        "use": "Fertilizers, food security infrastructure",
        "status": "OK",
        "note": "Supply adequate — food security authorizations at full velocity",
        "color": "teal"
      }
    ],
    "categories": [
      {
        "id": "critical-minerals",
        "name": "Critical Minerals Extraction",
        "icon": "⛏",
        "description": "Lithium, cobalt, and rare earth elements are the physical foundation of AI infrastructure, clean energy, and advanced manufacturing. Phase Zero prioritizes expanding extraction capacity before construction demand overwhelms supply.",
        "total_authorized_b": 420,
        "companies": [
          {
            "name": "Altiplano Lithium Corp.",
            "country": "Chile",
            "authorization_m": 2800,
            "purpose": "Expand lithium brine extraction capacity — Atacama operations",
            "status": "active",
            "local_labor_pct": 84
          },
          {
            "name": "Kasai Minerals Ltd.",
            "country": "DR Congo",
            "authorization_m": 1400,
            "purpose": "Cobalt + copper mine expansion with worker safety upgrades",
            "status": "active",
            "local_labor_pct": 91
          },
          {
            "name": "Western Rare Earth Industries",
            "country": "Australia",
            "authorization_m": 1900,
            "purpose": "REE processing facility — reduces concentration risk",
            "status": "authorizing",
            "local_labor_pct": 88
          },
          {
            "name": "Intermountain REE Partners",
            "country": "United States",
            "authorization_m": 1600,
            "purpose": "Domestic rare earth extraction — Mountain Pass expansion",
            "status": "active",
            "local_labor_pct": 93
          }
        ]
      },
      {
        "id": "industrial-metals",
        "name": "Industrial Metals and Steel",
        "icon": "🏭",
        "description": "Copper, steel, and aluminum underpin every kilometer of power grid, every water pipe, and every structural building frame. Phase Zero scales global production capacity before construction bidding begins.",
        "total_authorized_b": 610,
        "companies": [
          {
            "name": "Andean Copper Holdings",
            "country": "Peru",
            "authorization_m": 3200,
            "purpose": "Open-pit copper expansion — Northern Highlands circuit",
            "status": "active",
            "local_labor_pct": 87
          },
          {
            "name": "Copperbelt Industrial Partners",
            "country": "Zambia",
            "authorization_m": 1800,
            "purpose": "Deep copper shaft rehabilitation and capacity restoration",
            "status": "active",
            "local_labor_pct": 92
          },
          {
            "name": "Bharat Steel Infrastructure Ltd.",
            "country": "India",
            "authorization_m": 4100,
            "purpose": "Structural steel mill expansion — 12M tonne/year target",
            "status": "authorizing",
            "local_labor_pct": 96
          },
          {
            "name": "Danube Aluminum Works",
            "country": "Austria",
            "authorization_m": 2200,
            "purpose": "Low-carbon aluminum smelting — 100% hydroelectric powered",
            "status": "active",
            "local_labor_pct": 89
          }
        ]
      },
      {
        "id": "energy-infrastructure",
        "name": "Energy Infrastructure Materials",
        "icon": "⚡",
        "description": "Solar panels, wind turbine components, transformer hardware, and grid control systems require specialized manufacturing at unprecedented scale. Phase Zero credits build that manufacturing capacity globally, including in the nations that will use it.",
        "total_authorized_b": 380,
        "companies": [
          {
            "name": "Sahara Solar Manufacturing Co.",
            "country": "Egypt",
            "authorization_m": 2600,
            "purpose": "Photovoltaic panel manufacturing — 8GW annual capacity",
            "status": "active",
            "local_labor_pct": 91
          },
          {
            "name": "Nordic Grid Systems",
            "country": "Sweden",
            "authorization_m": 1900,
            "purpose": "High-voltage transformer and substation hardware production",
            "status": "authorizing",
            "local_labor_pct": 85
          },
          {
            "name": "Patagonia Wind Components",
            "country": "Argentina",
            "authorization_m": 1500,
            "purpose": "Wind turbine nacelle and blade manufacturing",
            "status": "active",
            "local_labor_pct": 88
          },
          {
            "name": "Karnataka Silicon Ltd.",
            "country": "India",
            "authorization_m": 2200,
            "purpose": "Polysilicon purification for solar and semiconductor supply",
            "status": "active",
            "local_labor_pct": 94
          }
        ]
      },
      {
        "id": "construction-materials",
        "name": "Construction Materials",
        "icon": "🧱",
        "description": "Cement, aggregate, structural timber, and prefabricated components are consumed at massive scale during infrastructure construction. Phase Zero builds local production capacity in every region so materials are available where and when they are needed.",
        "total_authorized_b": 290,
        "companies": [
          {
            "name": "Nile Basin Cement Group",
            "country": "Ethiopia",
            "authorization_m": 1100,
            "purpose": "Regional cement plant — serves East Africa infrastructure buildout",
            "status": "active",
            "local_labor_pct": 95
          },
          {
            "name": "Mekong Prefab Systems",
            "country": "Vietnam",
            "authorization_m": 950,
            "purpose": "Modular housing and clinic component manufacturing",
            "status": "authorizing",
            "local_labor_pct": 93
          },
          {
            "name": "Pacific Aggregate Partners",
            "country": "Australia",
            "authorization_m": 1400,
            "purpose": "Crushed rock and sand supply for Pacific infrastructure zone",
            "status": "active",
            "local_labor_pct": 82
          },
          {
            "name": "Great Plains Structural Timber",
            "country": "Canada",
            "authorization_m": 1200,
            "purpose": "Mass timber and engineered lumber — carbon-certified supply",
            "status": "active",
            "local_labor_pct": 87
          }
        ]
      },
      {
        "id": "medical-supply",
        "name": "Medical and Pharmaceutical Supply Chain",
        "icon": "💊",
        "description": "Healthcare infrastructure requires a continuous supply of pharmaceuticals, medical devices, diagnostics, and cold-chain logistics. Phase Zero builds this supply chain in every region, ending dependency on single-source global suppliers.",
        "total_authorized_b": 180,
        "companies": [
          {
            "name": "Hyderabad Pharma Commons",
            "country": "India",
            "authorization_m": 1800,
            "purpose": "Generic pharmaceutical API production — 400+ essential medicines",
            "status": "active",
            "local_labor_pct": 97
          },
          {
            "name": "Lagos Medical Device Works",
            "country": "Nigeria",
            "authorization_m": 820,
            "purpose": "Diagnostic equipment and basic medical device manufacturing",
            "status": "authorizing",
            "local_labor_pct": 94
          },
          {
            "name": "Andean Cold Chain Logistics",
            "country": "Colombia",
            "authorization_m": 640,
            "purpose": "Vaccine cold-chain network — Andean + Amazon regions",
            "status": "active",
            "local_labor_pct": 91
          }
        ]
      }
    ],
    "summary": {
      "total_authorized_b": 1880,
      "categories": 5,
      "companies_authorized": 19,
      "companies_active": 14,
      "oracle_ok": 4,
      "oracle_watch": 4,
      "oracle_restricted": 1
    }
  },
  "training": {
    "tracks": [
      {
        "id": "robotics",
        "name": "Robotics Engineering and Manufacturing",
        "icon": "🤖",
        "duration_months": 18,
        "dividend_monthly": 3900,
        "enrolled_global": 5700000,
        "description": "Design, build, and maintain the robotic systems that will construct and operate infrastructure in the Autonomous Era. Includes mechanical design, embedded systems programming, sensor integration, and factory floor deployment. The robots that will build the future need humans to build them first.",
        "modules": [
          "Mechanical systems and actuator design",
          "Embedded control systems and firmware",
          "Computer vision and sensor fusion",
          "Robotic process deployment and commissioning",
          "Maintenance, diagnostics, and field repair"
        ],
        "employment_outcomes": [
          "Robotics assembly technician",
          "Automation systems engineer",
          "Field robotics deployment specialist",
          "Manufacturing line integration lead"
        ]
      },
      {
        "id": "ai-oversight",
        "name": "AI Systems Oversight and Monitoring",
        "icon": "🧠",
        "duration_months": 12,
        "dividend_monthly": 5200,
        "enrolled_global": 4500000,
        "description": "AI systems require human oversight, anomaly detection, and escalation management — tasks that AI cannot reliably perform on itself. This track trains workers to monitor AI decision-making in critical infrastructure contexts, identify edge cases, flag failures, and ensure systems operate safely and within intended parameters.",
        "modules": [
          "AI system architecture fundamentals",
          "Anomaly detection and alert response",
          "Bias identification and correction protocols",
          "Critical infrastructure AI safety standards",
          "Human-AI collaboration frameworks"
        ],
        "employment_outcomes": [
          "AI operations monitor",
          "Infrastructure AI safety analyst",
          "Algorithmic audit technician",
          "Edge-case escalation specialist"
        ]
      },
      {
        "id": "infrastructure",
        "name": "Infrastructure Deployment",
        "icon": "⚡",
        "duration_months": 24,
        "dividend_monthly": 3800,
        "enrolled_global": 9700000,
        "description": "The largest physical buildout in human history requires workers with hands-on skills in solar and wind installation, advanced hydro-cascade systems, geothermal drilling, water treatment, and grid interconnection. This is where the most labor is needed and where former factory and logistics workers transition most directly.",
        "modules": [
          "Solar PV installation and commissioning",
          "Wind turbine assembly and maintenance",
          "Geothermal drilling operations",
          "Water treatment and distribution systems",
          "Grid interconnection and safety protocols"
        ],
        "employment_outcomes": [
          "Solar installation technician",
          "Geothermal drilling operator",
          "Water systems field engineer",
          "Grid commissioning specialist"
        ]
      },
      {
        "id": "hardware-maintenance",
        "name": "Hardware and Data Center Maintenance",
        "icon": "🖥",
        "duration_months": 12,
        "dividend_monthly": 4100,
        "enrolled_global": 3500000,
        "description": "AI runs on physical hardware. Data centers, server farms, cooling systems, fiber networks, and edge computing nodes all require continuous human maintenance. This is the physical immune system of the AI grid — and it requires skilled humans who understand both hardware systems and the AI workloads they support.",
        "modules": [
          "Server hardware and component repair",
          "Data center cooling and power systems",
          "Network infrastructure and fiber installation",
          "Edge computing node deployment",
          "Preventive maintenance and lifecycle management"
        ],
        "employment_outcomes": [
          "Data center operations technician",
          "Network infrastructure specialist",
          "Hardware maintenance engineer",
          "Edge node deployment technician"
        ]
      },
      {
        "id": "healthcare-tech",
        "name": "Healthcare Technology and Community Health",
        "icon": "🏥",
        "duration_months": 18,
        "dividend_monthly": 3700,
        "enrolled_global": 6800000,
        "description": "AEDIS funds the construction of clinics and hospitals worldwide. Those facilities need trained workers to operate them. This track covers community health worker roles, medical equipment operation, telehealth technology, and healthcare infrastructure management — enabling the healthcare buildout to immediately deploy a trained workforce as each facility opens.",
        "modules": [
          "Community health fundamentals and triage",
          "Medical device operation and calibration",
          "Telehealth platform management",
          "Clinic supply chain and cold-chain logistics",
          "Health data recording and Public Ledger integration"
        ],
        "employment_outcomes": [
          "Community health worker",
          "Medical equipment technician",
          "Clinic operations coordinator",
          "Telehealth systems specialist"
        ]
      },
      {
        "id": "agricultural-tech",
        "name": "Agricultural Technology and Food Security",
        "icon": "🌾",
        "duration_months": 12,
        "dividend_monthly": 3600,
        "enrolled_global": 8400000,
        "description": "AI-powered precision agriculture, automated irrigation systems, and food supply chain logistics require trained human operators and maintenance technicians. Food security is infrastructure — and the workers who currently farm by hand are the most experienced practitioners of the problem AI is trying to solve.",
        "modules": [
          "Precision agriculture sensor networks",
          "Automated irrigation and water management",
          "Food supply chain traceability systems",
          "Cold storage and distribution infrastructure",
          "Agricultural drone operation and maintenance"
        ],
        "employment_outcomes": [
          "Precision agriculture technician",
          "Food systems logistics coordinator",
          "Agricultural sensor network operator",
          "Rural infrastructure specialist"
        ]
      },
      {
        "id": "environmental",
        "name": "Environmental Monitoring and Ecological Restoration",
        "icon": "🌿",
        "duration_months": 15,
        "dividend_monthly": 3700,
        "enrolled_global": 3200000,
        "description": "Ocean cleanup, watershed restoration, reforestation, and biome monitoring require coordinated human field work that no AI can perform remotely. This track trains workers in environmental monitoring systems, ecological restoration techniques, and the AEDIS ledger protocols for verifying environmental project outcomes.",
        "modules": [
          "Environmental sensor deployment and data collection",
          "Watershed and marine ecosystem assessment",
          "Reforestation and habitat restoration techniques",
          "Climate monitoring and reporting protocols",
          "Ecological project AEDIS verification methods"
        ],
        "employment_outcomes": [
          "Environmental monitoring technician",
          "Ecological restoration field worker",
          "Watershed management specialist",
          "Climate data verification analyst"
        ]
      }
    ],
    "summary": {
      "total_tracks": 7,
      "total_enrolled_global": 41800000,
      "average_monthly_dividend": 4000,
      "total_monthly_dividend_payout_b": 167.2,
      "dividend_policy": {
        "living_wage_monthly": 3500,
        "wage_replacement_cap_monthly": 12500,
        "description": "Workers displaced by AI/automation are paid at their prior salary during training, floored at the living wage and capped for program sustainability. Workers who were not displaced are paid a flat living wage."
      },
      "scale_basis": "World Economic Forum: 85-92 million jobs displaced globally by 2030 (AI/automation). AEDIS Workforce Transition at ~42 million enrolled represents a meaningful share of that projected need."
    }
  }
} as const;

export type DemoJob = {
  id: string; city: string; state: string; category: string; title: string; company: string; aedis_id: string;
  budget: number; status: "active" | "completed" | "flagged"; claimed_pct: number; verified_pct: number; summary: string;
  flag_reason?: string; flag_severity?: string;
  payments: ReadonlyArray<{ label: string; amount: number; note: string }>;
  materials: ReadonlyArray<{ item: string; spec_claimed: string; spec_delivered: string; note: string }>;
  timeline: ReadonlyArray<{ label: string; note: string }>;
};
