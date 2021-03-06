import 'package:flutter/material.dart';

class DraggingListItem extends StatelessWidget {
  const DraggingListItem({
    Key? key,
    required this.dragKey,
    required this.photoProvider,
  }) : super(key: key);

  final GlobalKey dragKey;
  final ImageProvider photoProvider;

  @override
  Widget build(BuildContext context) {
    return FractionalTranslation(
      translation: const Offset(-0.5, -0.5),
      child: ClipRRect(
        key: dragKey,
        borderRadius: BorderRadius.circular(12.0),
        child: SizedBox(
          height: 150,
          width: 150,
          child: Opacity(
            opacity: 0.85,
            child: Image(
              image: photoProvider,
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
    );
  }
}

class Item {
  ItemType type;
  String name;
  String description;
  int id;
  ImageProvider image;
  String fields;

  Item(
      {required this.type,
      required this.name,
      required this.description,
      required this.id,
      required this.image,
      required this.fields});
}

class Service {
  int id;
  String name;
  ImageProvider logo;
  List<Item> items;
  Service(
      {required this.id,
      required this.name,
      required this.logo,
      required this.items});
  ImageProvider get getLogo {
    return logo;
  }
}

enum ParamType { string, number, undefined }

class ParamModel {
  String type;
  String name;
  TextEditingController controller;
  ParamModel(this.type, this.name, this.controller);

  getType() {
    if (type == "string") {
      return ParamType.string;
    } else if (type == "number") {
      return ParamType.number;
    } else {
      return ParamType.undefined;
    }
  }
}

class RequestCreationArea {
  int actionId;
  String actionParams;
  int reactionId;
  String reactionParams;

  RequestCreationArea(
      this.actionId, this.actionParams, this.reactionId, this.reactionParams);

  Map<String, dynamic> toJson() {
    return {
      "action_id": actionId,
      "action_params": actionParams,
      "reaction_id": reactionId,
      "reaction_params": reactionParams
    };
  }
}

enum ItemType { action, reaction, none }
