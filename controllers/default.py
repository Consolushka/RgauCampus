# -*- coding: utf-8 -*-
# -------------------------------------------------------------------------
# This is a sample controller
# this file is released under public domain and you can use without limitations
# -------------------------------------------------------------------------
import json
import json


room_purposesDB = db(db.m_room_purpose).select()
building_purposesDB = db(db.m_buildings_purpose).select()
buildingsDB = db(db.m_buildings).select()
roomsDB = db(db.m_rooms).select()
facsDB = db(db.t_fac).select()
ownersDB = db(db.s_divisions).select()
rs=[]

ruToEnPurpose = {
    "Учебный": "learning",
    "Административный": "admin",
    "Спортивный": "sport",
    "Культурный": "culture",
    "Общежитие": "leaving",
}


class Room:
    id = 0
    name = ""
    building = ""
    purpose = ""
    floor = ""
    fac = ""
    owner = ""

    def __init__(self, row):
        self.id = row.id
        self.name = row.NAME
        self.building = row.BUILDING
        self.floor = row.FLR

        for purpose in room_purposesDB:
            if purpose.id is row.PURPOSE:
                self.purpose = purpose.NAME

        for fac in facsDB:
            if fac.id is int(row.FAC):
                self.fac = fac.FULL_NAME

        for owner in ownersDB:
            if int(owner.id) == int(row.OWNER):
                self.owner = owner.NAME


    def to_object(self):
        dict = {
            'name': self.name,
            'purpose': self.purpose
        }
        return dict


class Building:

    def __init__(self, row):
        self.id = row.id
        self.name = row.NAME
        self.address = str(row.ADDRESS)
        self.extra = str(row.EXTRA)
        for purpose in building_purposesDB:
            if purpose.id is int(row.PURPOSE):
                self.purpose = ruToEnPurpose[purpose.NAME]
        self.flrs = []
        self.facs = []
        self.owners = []

    def fill_rooms(self, rooms):
        for room in rooms:
            if room.building is self.id:
                self.throw_to_structure(room)

    def throw_to_structure(self, room):
        self.throw_to_flrs(room)
        self.throw_to_facs(room)
        self.throw_to_owners(room)

    def throw_to_flrs(self, room):
        for flr in self.flrs:
            if flr['number'] is room.floor:
                flr["rooms"].append(room.to_object())
                return

        self.flrs.append({
            "number": room.floor,
            "rooms": [room.to_object()]
        })

    def throw_to_facs(self, room):
        for fac in self.facs:
            if fac["name"] == room.fac:
                fac["rooms"].append(room.to_object())
                return

        self.facs.append({
            "name": room.fac,
            "rooms": [room.to_object()]
        })

    def throw_to_owners(self, room):
        for owner in self.owners:
            if owner["name"] == room.owner:
                owner["rooms"].append(room.to_object())
                return

        self.owners.append({
            "name": room.owner,
            "rooms": [room.to_object()]
        })

    def to_object(self):
        dict = {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "extra": self.extra,
            "purpose": self.purpose,
            "flrs": self.flrs,
            "facs": self.facs,
            "owners": self.owners
        }
        return dict


# ---- example index page ----
def index():
    rooms = []
    builds = []
    for room in roomsDB:
        rooms.append(Room(room))
    for bld in buildingsDB:
        building = Building(bld)
        building.fill_rooms(rooms)
        builds.append(building.to_object())
    return dict(buildings=json.dumps(builds))

# # ---- API (example) -----
# @auth.requires_login()
# def api_get_user_email():
#     if not request.env.request_method == 'GET': raise HTTP(403)
#     return response.json({'status':'success', 'email':auth.user.email})

# # ---- Smart Grid (example) -----
# @auth.requires_membership('admin') # can only be accessed by members of admin groupd
# def grid():
#     response.view = 'generic.html' # use a generic view
#     tablename = request.args(0)
#     if not tablename in db.tables: raise HTTP(403)
#     grid = SQLFORM.smartgrid(db[tablename], args=[tablename], deletable=False, editable=False)
#     return dict(grid=grid)

# # ---- Embedded wiki (example) ----
# def wiki():
#     auth.wikimenu() # add the wiki to the menu
#     return auth.wiki() 

# # ---- Action for login/register/etc (required for auth) -----
# def user():
#     """
#     exposes:
#     http://..../[app]/default/user/login
#     http://..../[app]/default/user/logout
#     http://..../[app]/default/user/register
#     http://..../[app]/default/user/profile
#     http://..../[app]/default/user/retrieve_password
#     http://..../[app]/default/user/change_password
#     http://..../[app]/default/user/bulk_register
#     use @auth.requires_login()
#         @auth.requires_membership('group name')
#         @auth.requires_permission('read','table name',record_id)
#     to decorate functions that need access control
#     also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
#     """
#     return dict(form=auth())

# # ---- action to server uploaded static content (required) ---
# @cache.action()
# def download():
#     """
#     allows downloading of uploaded files
#     http://..../[app]/default/download/[filename]
#     """
#     return response.download(request, db)
