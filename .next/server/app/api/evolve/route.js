/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/evolve/route";
exports.ids = ["app/api/evolve/route"];
exports.modules = {

/***/ "(rsc)/./app/api/evolve/route.ts":
/*!*********************************!*\
  !*** ./app/api/evolve/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_mongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/mongo */ \"(rsc)/./lib/mongo.ts\");\n/* harmony import */ var _lib_nft__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/nft */ \"(rsc)/./lib/nft.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\nasync function POST(req) {\n    try {\n        const { walletId, source = \"apple\" } = await req.json();\n        if (!walletId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                error: \"Missing walletId\"\n            }, {\n                status: 400\n            });\n        }\n        // 1. Connect to DB and find user\n        const db = await (0,_lib_mongo__WEBPACK_IMPORTED_MODULE_0__.connectDB)();\n        const users = db.collection(\"users\");\n        const user = await users.findOne({\n            walletId\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        const { healthSummary, passportId, xp = 0 } = user;\n        if (!healthSummary) {\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                error: \"No health data found for user\"\n            }, {\n                status: 400\n            });\n        }\n        if (!passportId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                error: \"No NFT passport linked to user\"\n            }, {\n                status: 400\n            });\n        }\n        // 2. Calculate XP and Level\n        const steps = healthSummary.steps ?? 0;\n        const newXp = xp + steps * 0.001;\n        const newLvl = Math.floor(newXp / 10);\n        const metadata = {\n            name: `NAO Passport Level ${newLvl}`,\n            description: `Health data synced from ${source}.`,\n            attributes: [\n                {\n                    trait_type: \"Level\",\n                    value: newLvl\n                },\n                {\n                    trait_type: \"XP\",\n                    value: newXp\n                },\n                {\n                    trait_type: \"Source\",\n                    value: source\n                },\n                {\n                    trait_type: \"Steps\",\n                    value: steps\n                }\n            ]\n        };\n        // 3. Update XP in DB\n        await users.updateOne({\n            walletId\n        }, {\n            $set: {\n                xp: newXp\n            }\n        });\n        // 4. Update NFT\n        const nftResult = await (0,_lib_nft__WEBPACK_IMPORTED_MODULE_1__.updateTokenURI)(passportId, metadata);\n        // 5. Respond\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            status: \"success\",\n            updatedLevel: newLvl,\n            updatedXp: newXp,\n            nftResult\n        });\n    } catch (err) {\n        console.error(\"❌ Evolve API error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2V2b2x2ZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXdDO0FBQ0c7QUFDYTtBQUVqRCxlQUFlRyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsT0FBTyxFQUFFLEdBQUcsTUFBTUYsSUFBSUcsSUFBSTtRQUVyRCxJQUFJLENBQUNGLFVBQVU7WUFDYixPQUFPSCxxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQW1CLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN4RTtRQUVBLGlDQUFpQztRQUNqQyxNQUFNQyxLQUFLLE1BQU1WLHFEQUFTQTtRQUMxQixNQUFNVyxRQUFRRCxHQUFHRSxVQUFVLENBQUM7UUFDNUIsTUFBTUMsT0FBTyxNQUFNRixNQUFNRyxPQUFPLENBQUM7WUFBRVQ7UUFBUztRQUU1QyxJQUFJLENBQUNRLE1BQU07WUFDVCxPQUFPWCxxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWlCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN0RTtRQUVBLE1BQU0sRUFBRU0sYUFBYSxFQUFFQyxVQUFVLEVBQUVDLEtBQUssQ0FBQyxFQUFFLEdBQUdKO1FBRTlDLElBQUksQ0FBQ0UsZUFBZTtZQUNsQixPQUFPYixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWdDLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNyRjtRQUNBLElBQUksQ0FBQ08sWUFBWTtZQUNmLE9BQU9kLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RGO1FBRUEsNEJBQTRCO1FBQzVCLE1BQU1TLFFBQVFILGNBQWNHLEtBQUssSUFBSTtRQUNyQyxNQUFNQyxRQUFRRixLQUFLQyxRQUFRO1FBQzNCLE1BQU1FLFNBQVNDLEtBQUtDLEtBQUssQ0FBQ0gsUUFBUTtRQUVsQyxNQUFNSSxXQUFXO1lBQ2ZDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRUosUUFBUTtZQUNwQ0ssYUFBYSxDQUFDLHdCQUF3QixFQUFFbkIsT0FBTyxDQUFDLENBQUM7WUFDakRvQixZQUFZO2dCQUNWO29CQUFFQyxZQUFZO29CQUFTQyxPQUFPUjtnQkFBTztnQkFDckM7b0JBQUVPLFlBQVk7b0JBQU1DLE9BQU9UO2dCQUFNO2dCQUNqQztvQkFBRVEsWUFBWTtvQkFBVUMsT0FBT3RCO2dCQUFPO2dCQUN0QztvQkFBRXFCLFlBQVk7b0JBQVNDLE9BQU9WO2dCQUFNO2FBQ3JDO1FBQ0g7UUFFQSxxQkFBcUI7UUFDckIsTUFBTVAsTUFBTWtCLFNBQVMsQ0FBQztZQUFFeEI7UUFBUyxHQUFHO1lBQUV5QixNQUFNO2dCQUFFYixJQUFJRTtZQUFNO1FBQUU7UUFFMUQsZ0JBQWdCO1FBQ2hCLE1BQU1ZLFlBQVksTUFBTTlCLHdEQUFjQSxDQUFDZSxZQUFZTztRQUVuRCxhQUFhO1FBQ2IsT0FBT3JCLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFDdkJFLFFBQVE7WUFDUnVCLGNBQWNaO1lBQ2RhLFdBQVdkO1lBQ1hZO1FBQ0Y7SUFDRixFQUFFLE9BQU9HLEtBQUs7UUFDWkMsUUFBUTNCLEtBQUssQ0FBQyx1QkFBdUIwQjtRQUNyQyxPQUFPaEMscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdFO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy91c2VyL25hby1oZWFsdGgtc3luYy9hcHAvYXBpL2V2b2x2ZS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25uZWN0REIgfSBmcm9tIFwiQC9saWIvbW9uZ29cIjtcbmltcG9ydCB7IHVwZGF0ZVRva2VuVVJJIH0gZnJvbSBcIkAvbGliL25mdFwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB3YWxsZXRJZCwgc291cmNlID0gXCJhcHBsZVwiIH0gPSBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgaWYgKCF3YWxsZXRJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyB3YWxsZXRJZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgLy8gMS4gQ29ubmVjdCB0byBEQiBhbmQgZmluZCB1c2VyXG4gICAgY29uc3QgZGIgPSBhd2FpdCBjb25uZWN0REIoKTtcbiAgICBjb25zdCB1c2VycyA9IGRiLmNvbGxlY3Rpb24oXCJ1c2Vyc1wiKTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlcnMuZmluZE9uZSh7IHdhbGxldElkIH0pO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVc2VyIG5vdCBmb3VuZFwiIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBoZWFsdGhTdW1tYXJ5LCBwYXNzcG9ydElkLCB4cCA9IDAgfSA9IHVzZXI7XG5cbiAgICBpZiAoIWhlYWx0aFN1bW1hcnkpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk5vIGhlYWx0aCBkYXRhIGZvdW5kIGZvciB1c2VyXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgaWYgKCFwYXNzcG9ydElkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJObyBORlQgcGFzc3BvcnQgbGlua2VkIHRvIHVzZXJcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIC8vIDIuIENhbGN1bGF0ZSBYUCBhbmQgTGV2ZWxcbiAgICBjb25zdCBzdGVwcyA9IGhlYWx0aFN1bW1hcnkuc3RlcHMgPz8gMDtcbiAgICBjb25zdCBuZXdYcCA9IHhwICsgc3RlcHMgKiAwLjAwMTtcbiAgICBjb25zdCBuZXdMdmwgPSBNYXRoLmZsb29yKG5ld1hwIC8gMTApO1xuXG4gICAgY29uc3QgbWV0YWRhdGEgPSB7XG4gICAgICBuYW1lOiBgTkFPIFBhc3Nwb3J0IExldmVsICR7bmV3THZsfWAsXG4gICAgICBkZXNjcmlwdGlvbjogYEhlYWx0aCBkYXRhIHN5bmNlZCBmcm9tICR7c291cmNlfS5gLFxuICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICB7IHRyYWl0X3R5cGU6IFwiTGV2ZWxcIiwgdmFsdWU6IG5ld0x2bCB9LFxuICAgICAgICB7IHRyYWl0X3R5cGU6IFwiWFBcIiwgdmFsdWU6IG5ld1hwIH0sXG4gICAgICAgIHsgdHJhaXRfdHlwZTogXCJTb3VyY2VcIiwgdmFsdWU6IHNvdXJjZSB9LFxuICAgICAgICB7IHRyYWl0X3R5cGU6IFwiU3RlcHNcIiwgdmFsdWU6IHN0ZXBzIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICAvLyAzLiBVcGRhdGUgWFAgaW4gREJcbiAgICBhd2FpdCB1c2Vycy51cGRhdGVPbmUoeyB3YWxsZXRJZCB9LCB7ICRzZXQ6IHsgeHA6IG5ld1hwIH0gfSk7XG5cbiAgICAvLyA0LiBVcGRhdGUgTkZUXG4gICAgY29uc3QgbmZ0UmVzdWx0ID0gYXdhaXQgdXBkYXRlVG9rZW5VUkkocGFzc3BvcnRJZCwgbWV0YWRhdGEpO1xuXG4gICAgLy8gNS4gUmVzcG9uZFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgdXBkYXRlZExldmVsOiBuZXdMdmwsXG4gICAgICB1cGRhdGVkWHA6IG5ld1hwLFxuICAgICAgbmZ0UmVzdWx0LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEV2b2x2ZSBBUEkgZXJyb3I6XCIsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImNvbm5lY3REQiIsInVwZGF0ZVRva2VuVVJJIiwiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcSIsIndhbGxldElkIiwic291cmNlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZGIiLCJ1c2VycyIsImNvbGxlY3Rpb24iLCJ1c2VyIiwiZmluZE9uZSIsImhlYWx0aFN1bW1hcnkiLCJwYXNzcG9ydElkIiwieHAiLCJzdGVwcyIsIm5ld1hwIiwibmV3THZsIiwiTWF0aCIsImZsb29yIiwibWV0YWRhdGEiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJhdHRyaWJ1dGVzIiwidHJhaXRfdHlwZSIsInZhbHVlIiwidXBkYXRlT25lIiwiJHNldCIsIm5mdFJlc3VsdCIsInVwZGF0ZWRMZXZlbCIsInVwZGF0ZWRYcCIsImVyciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/evolve/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongo.ts":
/*!**********************!*\
  !*** ./lib/mongo.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\nconst uri = process.env.MONGODB_URI;\nconsole.log(\"🔍 Loaded MONGODB_URI:\", uri); // <- add this log\nif (!uri) {\n    throw new Error(\"❌ MONGODB_URI is missing from .env.local\");\n}\n\nconst dbName = process.env.MONGODB_DB_NAME || \"nao\";\n// Global is used here to preserve the value across hot reloads in development (Next.js)\nlet globalWithMongo = global;\nlet client;\nlet clientPromise;\nif (!process.env.MONGODB_URI) {\n    throw new Error(\"Please add your MongoDB URI to .env\");\n}\nif (true) {\n    if (!globalWithMongo._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);\n        globalWithMongo._mongoClientPromise = client.connect();\n    }\n    clientPromise = globalWithMongo._mongoClientPromise;\n} else {}\nasync function connectDB() {\n    try {\n        const client = await clientPromise;\n        return client.db(dbName);\n    } catch (err) {\n        console.error(\"❌ Failed to connect to MongoDB\", err);\n        throw err;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ28udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsTUFBTUEsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxXQUFXO0FBQ25DQyxRQUFRQyxHQUFHLENBQUMsMEJBQTBCTCxNQUFNLGtCQUFrQjtBQUU5RCxJQUFJLENBQUNBLEtBQUs7SUFDUixNQUFNLElBQUlNLE1BQU07QUFDbEI7QUFFMEM7QUFFMUMsTUFBTUUsU0FBU1AsUUFBUUMsR0FBRyxDQUFDTyxlQUFlLElBQUk7QUFFOUMsd0ZBQXdGO0FBQ3hGLElBQUlDLGtCQUFrQkM7QUFJdEIsSUFBSUM7QUFDSixJQUFJQztBQUVKLElBQUksQ0FBQ1osUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7SUFDNUIsTUFBTSxJQUFJRyxNQUFNO0FBQ2xCO0FBRUEsSUFBSUwsSUFBc0MsRUFBRTtJQUMxQyxJQUFJLENBQUNTLGdCQUFnQkksbUJBQW1CLEVBQUU7UUFDeENGLFNBQVMsSUFBSUwsZ0RBQVdBLENBQUNQO1FBQ3pCVSxnQkFBZ0JJLG1CQUFtQixHQUFHRixPQUFPRyxPQUFPO0lBQ3REO0lBQ0FGLGdCQUFnQkgsZ0JBQWdCSSxtQkFBbUI7QUFDckQsT0FBTyxFQUdOO0FBRU0sZUFBZUU7SUFDcEIsSUFBSTtRQUNGLE1BQU1KLFNBQVMsTUFBTUM7UUFDckIsT0FBT0QsT0FBT0ssRUFBRSxDQUFDVDtJQUNuQixFQUFFLE9BQU9VLEtBQUs7UUFDWmQsUUFBUWUsS0FBSyxDQUFDLGtDQUFrQ0Q7UUFDaEQsTUFBTUE7SUFDUjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvdXNlci9uYW8taGVhbHRoLXN5bmMvbGliL21vbmdvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuY29uc29sZS5sb2coXCLwn5SNIExvYWRlZCBNT05HT0RCX1VSSTpcIiwgdXJpKTsgLy8gPC0gYWRkIHRoaXMgbG9nXG5cbmlmICghdXJpKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIuKdjCBNT05HT0RCX1VSSSBpcyBtaXNzaW5nIGZyb20gLmVudi5sb2NhbFwiKTtcbn1cblxuaW1wb3J0IHsgRGIsIE1vbmdvQ2xpZW50IH0gZnJvbSBcIm1vbmdvZGJcIjtcblxuY29uc3QgZGJOYW1lID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9EQl9OQU1FIHx8IFwibmFvXCI7XG5cbi8vIEdsb2JhbCBpcyB1c2VkIGhlcmUgdG8gcHJlc2VydmUgdGhlIHZhbHVlIGFjcm9zcyBob3QgcmVsb2FkcyBpbiBkZXZlbG9wbWVudCAoTmV4dC5qcylcbmxldCBnbG9iYWxXaXRoTW9uZ28gPSBnbG9iYWwgYXMgdHlwZW9mIGdsb2JhbFRoaXMgJiB7XG4gIF9tb25nb0NsaWVudFByb21pc2U/OiBQcm9taXNlPE1vbmdvQ2xpZW50Pjtcbn07XG5cbmxldCBjbGllbnQ6IE1vbmdvQ2xpZW50O1xubGV0IGNsaWVudFByb21pc2U6IFByb21pc2U8TW9uZ29DbGllbnQ+O1xuXG5pZiAoIXByb2Nlc3MuZW52Lk1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBhZGQgeW91ciBNb25nb0RCIFVSSSB0byAuZW52XCIpO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICBpZiAoIWdsb2JhbFdpdGhNb25nby5fbW9uZ29DbGllbnRQcm9taXNlKSB7XG4gICAgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSk7XG4gICAgZ2xvYmFsV2l0aE1vbmdvLl9tb25nb0NsaWVudFByb21pc2UgPSBjbGllbnQuY29ubmVjdCgpO1xuICB9XG4gIGNsaWVudFByb21pc2UgPSBnbG9iYWxXaXRoTW9uZ28uX21vbmdvQ2xpZW50UHJvbWlzZSE7XG59IGVsc2Uge1xuICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcbiAgY2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKTogUHJvbWlzZTxEYj4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGNsaWVudFByb21pc2U7XG4gICAgcmV0dXJuIGNsaWVudC5kYihkYk5hbWUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEZhaWxlZCB0byBjb25uZWN0IHRvIE1vbmdvREJcIiwgZXJyKTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn0iXSwibmFtZXMiOlsidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiY29uc29sZSIsImxvZyIsIkVycm9yIiwiTW9uZ29DbGllbnQiLCJkYk5hbWUiLCJNT05HT0RCX0RCX05BTUUiLCJnbG9iYWxXaXRoTW9uZ28iLCJnbG9iYWwiLCJjbGllbnQiLCJjbGllbnRQcm9taXNlIiwiX21vbmdvQ2xpZW50UHJvbWlzZSIsImNvbm5lY3QiLCJjb25uZWN0REIiLCJkYiIsImVyciIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongo.ts\n");

/***/ }),

/***/ "(rsc)/./lib/nft.ts":
/*!********************!*\
  !*** ./lib/nft.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateTokenURI: () => (/* binding */ updateTokenURI)\n/* harmony export */ });\nasync function updateTokenURI(tokenId, metadata) {\n    console.log(\"🔗 updateTokenURI called:\", tokenId, metadata);\n    // TEMP: Simulate Thirdweb update call\n    return {\n        success: true,\n        updated: new Date().toISOString(),\n        tokenId,\n        metadata\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbmZ0LnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxlQUFlQSxlQUFlQyxPQUFlLEVBQUVDLFFBQWE7SUFDakVDLFFBQVFDLEdBQUcsQ0FBQyw2QkFBNkJILFNBQVNDO0lBRWxELHNDQUFzQztJQUN0QyxPQUFPO1FBQ0xHLFNBQVM7UUFDVEMsU0FBUyxJQUFJQyxPQUFPQyxXQUFXO1FBQy9CUDtRQUNBQztJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy91c2VyL25hby1oZWFsdGgtc3luYy9saWIvbmZ0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVUb2tlblVSSSh0b2tlbklkOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpIHtcbiAgY29uc29sZS5sb2coXCLwn5SXIHVwZGF0ZVRva2VuVVJJIGNhbGxlZDpcIiwgdG9rZW5JZCwgbWV0YWRhdGEpO1xuXG4gIC8vIFRFTVA6IFNpbXVsYXRlIFRoaXJkd2ViIHVwZGF0ZSBjYWxsXG4gIHJldHVybiB7XG4gICAgc3VjY2VzczogdHJ1ZSxcbiAgICB1cGRhdGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgdG9rZW5JZCxcbiAgICBtZXRhZGF0YSxcbiAgfTtcbn0iXSwibmFtZXMiOlsidXBkYXRlVG9rZW5VUkkiLCJ0b2tlbklkIiwibWV0YWRhdGEiLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsInVwZGF0ZWQiLCJEYXRlIiwidG9JU09TdHJpbmciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/nft.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevolve%2Froute&page=%2Fapi%2Fevolve%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevolve%2Froute.ts&appDir=%2FUsers%2Fuser%2Fnao-health-sync%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fuser%2Fnao-health-sync&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevolve%2Froute&page=%2Fapi%2Fevolve%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevolve%2Froute.ts&appDir=%2FUsers%2Fuser%2Fnao-health-sync%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fuser%2Fnao-health-sync&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_user_nao_health_sync_app_api_evolve_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/evolve/route.ts */ \"(rsc)/./app/api/evolve/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/evolve/route\",\n        pathname: \"/api/evolve\",\n        filename: \"route\",\n        bundlePath: \"app/api/evolve/route\"\n    },\n    resolvedPagePath: \"/Users/user/nao-health-sync/app/api/evolve/route.ts\",\n    nextConfigOutput,\n    userland: _Users_user_nao_health_sync_app_api_evolve_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZldm9sdmUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmV2b2x2ZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmV2b2x2ZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnVzZXIlMkZuYW8taGVhbHRoLXN5bmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGdXNlciUyRm5hby1oZWFsdGgtc3luYyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDRztBQUNoRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3VzZXIvbmFvLWhlYWx0aC1zeW5jL2FwcC9hcGkvZXZvbHZlL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9ldm9sdmUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9ldm9sdmVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2V2b2x2ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy91c2VyL25hby1oZWFsdGgtc3luYy9hcHAvYXBpL2V2b2x2ZS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevolve%2Froute&page=%2Fapi%2Fevolve%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevolve%2Froute.ts&appDir=%2FUsers%2Fuser%2Fnao-health-sync%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fuser%2Fnao-health-sync&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fevolve%2Froute&page=%2Fapi%2Fevolve%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fevolve%2Froute.ts&appDir=%2FUsers%2Fuser%2Fnao-health-sync%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fuser%2Fnao-health-sync&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();