import { TypedRoute, TypedParam, TypedQuery } from "@nestia/core";
import { Controller,Get  } from "@nestjs/common";
import { tags } from "typia";
//import { IBeach } from "../structures/Beach";

// src/api/structures/Beach.ts

export interface IBeach  {
  id: string & tags.Format<"uuid">;
  created_at: string & tags.Format<"date-time">;
}

@Controller("beaches")
export class BeachController {


  @TypedRoute.Get("random")
  public async random(): Promise<IBeach> {
    return {
      id: "2b5e21d8-0e44-4482-bd3e-4540dee7f3d6",
       created_at: "2023-04-23T12:04:54.168Z",   
    };
  }
}


 
 
