import {setWorldConstructor, World} from "@cucumber/cucumber"
import {Application} from "express";
import app from "../../src/app"

setWorldConstructor(function (this: World & {app: Application}) {
  this.app = app
});
