from tkinter import *
from tkinter import ttk

class Window(Frame):

    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.master = master
        self.init_window()

    def init_window(self):

        self.master.title("GUI")
        self.pack(fill=BOTH, expand=1)

        self.bg_img = PhotoImage(file='BG.png')
        self.nav_img = PhotoImage(file='nav_inactive.png')
        self.audio_img = PhotoImage(file='audio_inactive.png')
        self.home_img = PhotoImage(file='home_inactive.png')
        self.temp_img = PhotoImage(file='temp_inactive.png')
        self.camera_img = PhotoImage(file='camera_inactive.png')
        
        
        w = self.bg_img.width()
        h = self.bg_img.height()

        #cv = Canvas(self, width=w, height=h)
        #cv.pack(side='top', fill='both', expand='yes')
        
        #cv.create_image(0, 0, image=self.bg_img, anchor='nw')

        style = ttk.Style(root)
        style.configure('righttab.TNotebook',
                        padding=0,
                        borderwidth=0,
                        tabmargins=0,
                        tabposition='en', )
        
        note = ttk.Notebook(self, style='righttab.TNotebook')

        tab1 = Frame(note, bg='#5685ab', width=w, height=h, relief=FLAT)
        tab2 = Frame(note, bg='#5685ab', width=w, height=h, relief=FLAT)
        tab3 = Frame(note, bg='#5685ab', width=w, height=h, relief=FLAT)
        tab4 = Frame(note, bg='#5685ab', width=w, height=h, relief=FLAT)
        tab5 = Frame(note, bg='#5685ab', width=w, height=h, relief=FLAT)

        note.add(tab1, image=self.nav_img)
        note.add(tab2, image=self.audio_img)
        note.add(tab3, image=self.home_img)
        note.add(tab4, image=self.temp_img)
        note.add(tab5, image=self.camera_img)

        note.pack()
        
        
##        cv.create_image(w, 0, image=self.nav_img, anchor="ne")
##        cv.create_image(w, 120, image=self.audio_img, anchor="ne")
##        cv.create_image(w, 240, image=self.home_img, anchor="ne")
##        cv.create_image(w, 360, image=self.temp_img, anchor="ne")
##        cv.create_image(w, 480, image=self.camera_img, anchor="ne")

##        quitButton = Button(self,
##                            text="Quit",
##                            command=self.client_exit)
##
##        quitButton.place(x=0, y=0)

    def client_exit(self):
        exit()

root = Tk()

root.geometry("1024x600")

#root.attributes('-fullscreen', True)

app = Window(root)

root.mainloop()
